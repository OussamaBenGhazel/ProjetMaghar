package tn.esprit.Microservice_Rendezvous;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private String accountSid = "AC46fb917cec6450d9b9ebd3bed279346c";
    private String authToken = "c65639b2c983a9528653800927bf0d01";
    private String twilioPhoneNumber = "+17473610465";

    public NotificationService() {
        System.out.println("accountSid: " + accountSid);
        System.out.println("authToken: " + authToken);
        System.out.println("twilioPhoneNumber: " + twilioPhoneNumber);

        if (accountSid == null || authToken == null) {
            throw new IllegalStateException("Twilio credentials are not properly configured.");
        }

        Twilio.init(accountSid, authToken);
    }

    public void envoyerRappelParSMS(RendezVous rendezVous) {
        String numeroClient = rendezVous.getNumeroTelephoneClient();
        if (numeroClient == null || numeroClient.trim().isEmpty()) {
            throw new IllegalArgumentException("Le numéro de téléphone du client est requis pour envoyer un rappel par SMS.");
        }

        if (!numeroClient.startsWith("+")) {
            numeroClient = "+216" + numeroClient;
        }

        String messageBody = "Bonjour " + rendezVous.getNomClient() + ",\n" +
                "Ceci est un rappel pour votre rendez-vous prévu le " + rendezVous.getDateHeure() + ".\n" +
                "Agent : " + (rendezVous.getAgentAssurance() != null ? rendezVous.getAgentAssurance().getNom() : "Non spécifié") + "\n" +
                "Statut : " + rendezVous.getStatut() + "\n" +
                "Cordialement,\nL'équipe de gestion des rendez-vous";

        try {
            Message message = Message.creator(
                    new PhoneNumber(numeroClient),
                    new PhoneNumber(twilioPhoneNumber),
                    messageBody
            ).create();

            System.out.println("SMS envoyé avec succès à " + numeroClient + ". SID : " + message.getSid());
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi du SMS à " + numeroClient + " : " + e.getMessage());
            throw e;
        }
    }
}
