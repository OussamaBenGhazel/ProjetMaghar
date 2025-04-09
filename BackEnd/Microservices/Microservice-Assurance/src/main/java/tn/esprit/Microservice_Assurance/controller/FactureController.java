package tn.esprit.Microservice_Assurance.controller;

import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Assurance.model.Facture;
import tn.esprit.Microservice_Assurance.service.FactureService;

import java.util.List;

@RestController
@RequestMapping("/api/factures")
public class FactureController {

    @Autowired
    private FactureService factureService;


    // Endpoint pour créer une facture à partir d'un contrat
    @PostMapping("/create/{contratId}")
    public ResponseEntity<Facture> createFactureFromContrat(@PathVariable Long contratId) {
        try {
            Facture facture = factureService.createFactureFromContrat(contratId);
            return new ResponseEntity<>(facture, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Récupère une facture par son ID.
     * @param id L'ID de la facture
     * @return La facture correspondante
     */
    @GetMapping("/{id}")
    public ResponseEntity<Facture> getFacture(@PathVariable Long id) {
        Facture facture = factureService.getFactureById(id);
        return ResponseEntity.ok(facture);
    }

    @GetMapping
    public ResponseEntity<List<Facture>> getAllFactures() {
        List<Facture> factures = factureService.getAllFactures();
        return ResponseEntity.ok(factures);
    }

    /**
     * Traite un paiement Stripe pour une facture spécifiée.
     * @param// factureId L'ID de la facture
     * @param //paymentMethodId L'ID de la méthode de paiement Stripe
     * @return La facture mise à jour après le paiement
     * @throws StripeException Si une erreur Stripe survient
     */
    @PostMapping("/{id}/pay")
    public ResponseEntity<Facture> processPaymentWithStripe(
            @PathVariable Long id,
            @RequestBody PaymentRequest paymentRequest) throws StripeException {
        Facture facture = factureService.processPaymentWithStripe(id, paymentRequest.getPaymentMethodId());
        return ResponseEntity.ok(facture);
    }

    /**
     * Confirme un paiement Stripe après une action requise (ex. 3D Secure).
     * @param //factureId L'ID de la facture
     * @return La facture mise à jour après confirmation
     * @throws StripeException Si une erreur Stripe survient
     */
    @PostMapping("/{id}/confirm")
    public ResponseEntity<Facture> confirmStripePayment(@PathVariable Long id) throws StripeException {
        Facture facture = factureService.confirmStripePayment(id);
        return ResponseEntity.ok(facture);
    }

    /**
     * Génère et télécharge un PDF de la facture.
     * @param factureId L'ID de la facture
     * @return Le fichier PDF sous forme de bytes
     */
    @GetMapping(value = "/{factureId}/download", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadFacturePDF(@PathVariable Long factureId) {
        try {
            byte[] pdfBytes = factureService.genererFacturePDF(factureId);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=facture_" + factureId + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            System.err.println("Erreur lors de la génération du PDF pour factureId " + factureId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Erreur serveur: " + e.getMessage()).getBytes());
        }
    }
}

/**
 * Classe pour recevoir les données de la méthode de paiement depuis le frontend.
 */
class PaymentRequest {
    private String paymentMethodId;

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }
}