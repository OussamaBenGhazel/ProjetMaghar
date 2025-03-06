package tn.esprit.Microservice_Assurance.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.Microservice_Assurance.feign.UserDTO;
import tn.esprit.Microservice_Assurance.feign.UserFeignClient;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.model.Facture;
import tn.esprit.Microservice_Assurance.model.StatutFacture;
import tn.esprit.Microservice_Assurance.repository.ContratRepository;
import tn.esprit.Microservice_Assurance.repository.FactureRepository;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FactureServiceImpl implements FactureService {

    @Autowired
    private FactureRepository factureRepository;

    @Autowired
    private ContratRepository contratRepository;

    @Autowired
    private UserFeignClient userClient;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Override
    @Transactional
    public Facture createFactureFromContrat(Long contratId) {
        Contrat contrat = getContratById(contratId);

        if (contrat == null) {
            throw new EntityNotFoundException("Contrat introuvable avec l'ID " + contratId);
        }

        if (contrat.getPrime() == null) {
            throw new IllegalArgumentException("Le contrat ne contient pas de prime !");
        }

        Optional<Facture> existingFactureOpt = factureRepository.findByContratId(contratId);
        if (existingFactureOpt.isPresent()) {
            Facture existingFacture = existingFactureOpt.get();
            existingFacture.setStatut(StatutFacture.EN_ATTENTE);
            existingFacture.setMontantTotal(contrat.getPrime());
            existingFacture.setDateEcheance(LocalDate.now().plusMonths(1));
            return factureRepository.save(existingFacture);
        }

        Facture facture = new Facture();
        facture.setContrat(contrat);
        facture.setNumeroFacture(UUID.randomUUID().toString());
        facture.setMontantTotal(contrat.getPrime());
        facture.setDateEmission(LocalDate.now());
        facture.setDateEcheance(LocalDate.now().plusMonths(1));
        facture.setStatut(StatutFacture.EN_ATTENTE);

        if (contrat.getUserId() != null) {
            UserDTO user = userClient.getUserById(contrat.getUserId());
            if (user == null) {
                throw new IllegalArgumentException("Aucun utilisateur trouvé pour le contrat avec ID " + contrat.getUserId());
            }
            facture.setUserId(user.getId());
        } else {
            throw new IllegalArgumentException("Le contrat n'est pas associé à un utilisateur !");
        }

        return factureRepository.save(facture);
    }

    @Override
    @Transactional
    public Facture processPaymentWithStripe(Long factureId, String paymentMethodId) throws StripeException {
        Facture facture = getFactureById(factureId);

        if (facture.getStatut() == StatutFacture.PAYEE) {
            throw new IllegalStateException("La facture est déjà payée");
        }

        Stripe.apiKey = stripeApiKey;
        PaymentIntent paymentIntent = createStripePaymentIntent(facture, paymentMethodId);

        switch (paymentIntent.getStatus()) {
            case "succeeded":
                facture.setStatut(StatutFacture.PAYEE);
                facture.setReferencePaiement(paymentIntent.getId());
                facture.setUpdatedAt(LocalDateTime.now());
                break;
            case "requires_action":
                facture.setStatut(StatutFacture.EN_ATTENTE_CONFIRMATION);
                facture.setReferencePaiement(paymentIntent.getId());
                facture.setUrlPaiement(paymentIntent.getNextAction().getRedirectToUrl().getUrl());
                break;
            default:
                facture.setStatut(StatutFacture.ECHEC);
                throw new RuntimeException("Échec du paiement : " + paymentIntent.getStatus());
        }

        return factureRepository.save(facture);
    }

    @Override
    @Transactional
    public Facture confirmStripePayment(Long factureId) throws StripeException {
        Facture facture = getFactureById(factureId);

        if (facture.getStatut() != StatutFacture.EN_ATTENTE_CONFIRMATION || facture.getReferencePaiement() == null) {
            throw new IllegalStateException("Aucun paiement en attente de confirmation pour cette facture");
        }

        Stripe.apiKey = stripeApiKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(facture.getReferencePaiement());

        if ("succeeded".equals(paymentIntent.getStatus())) {
            facture.setStatut(StatutFacture.PAYEE);
            facture.setUpdatedAt(LocalDateTime.now());
        } else {
            facture.setStatut(StatutFacture.ECHEC);
            throw new RuntimeException("La confirmation du paiement a échoué : " + paymentIntent.getStatus());
        }

        return factureRepository.save(facture);
    }

    @Override
    public Facture getFactureById(Long id) {
        return factureRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Facture non trouvée avec l'ID " + id));
    }

    private Contrat getContratById(Long contratId) {
        return contratRepository.findById(contratId)
                .orElseThrow(() -> new IllegalArgumentException("Contrat introuvable avec l'ID " + contratId));
    }

    private PaymentIntent createStripePaymentIntent(Facture facture, String paymentMethodId) throws StripeException {
        BigDecimal totalAmount = facture.getMontantTotal()
                .add(facture.getMontantTaxes() != null ? facture.getMontantTaxes() : BigDecimal.ZERO);

        if (totalAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Le montant total doit être supérieur à 0");
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(totalAmount.multiply(new BigDecimal("100")).longValue())
                .setCurrency("eur") // Ajustez selon votre devise (ex. "tnd" si dinar tunisien)
                .setPaymentMethod(paymentMethodId)
                .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.MANUAL)
                .setConfirm(true)
                .build();

        return PaymentIntent.create(params);
    }

    @Override
    public byte[] genererFacturePDF(Long factureId) {
        Facture facture = getFactureById(factureId);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            document.add(new Paragraph("Facture d'Assurance"));
            document.add(new Paragraph("Numéro de Facture : " + facture.getNumeroFacture()));
            document.add(new Paragraph("Date d'Émission : " + facture.getDateEmission()));
            document.add(new Paragraph("Date d'Échéance : " + facture.getDateEcheance()));
            document.add(new Paragraph("Montant Total : " + facture.getMontantTotal() + " TND"));
            document.add(new Paragraph("Statut : " + facture.getStatut()));

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF", e);
        }

        return outputStream.toByteArray();
    }

    @Override
    public byte[] signerFacturePDF(byte[] pdfBytes) {
        return pdfBytes; // Retourne les bytes non modifiés pour l'instant
    }

    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }
}