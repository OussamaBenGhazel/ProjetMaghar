// Interface FactureService
package tn.esprit.Microservice_Assurance.service;

import com.stripe.exception.StripeException;
import tn.esprit.Microservice_Assurance.model.Facture;

import java.util.List;

public interface FactureService {

    List<Facture> getAllFactures();
    Facture getFactureById(Long id);
    // Autres méthodes potentielles selon vos besoins

    Facture processPaymentWithStripe(Long factureId, String paymentMethodId) throws StripeException;
    Facture confirmStripePayment(Long factureId) throws StripeException; // Nouvelle méthode pour confirmer le paiement
    byte[] genererFacturePDF(Long factureId);
    byte[] signerFacturePDF(byte[] pdfBytes);

     Facture createFactureFromContrat(Long contratId) ;


}
