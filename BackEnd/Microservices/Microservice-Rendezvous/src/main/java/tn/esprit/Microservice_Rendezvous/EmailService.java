package tn.esprit.Microservice_Rendezvous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void envoyerEmailRappel(RendezVous rendezVous) {
        System.out.println("Envoi d'un e-mail de rappel à : " + rendezVous.getEmailClient());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(rendezVous.getEmailClient());
        message.setSubject("Rappel de votre rendez-vous");
        message.setText("Bonjour " + rendezVous.getNomClient() + ",\n\n" +
                "Ceci est un rappel pour votre rendez-vous prévu le " + rendezVous.getDateHeure() + ".\n" +
                "Agent : " + (rendezVous.getAgentAssurance() != null ? rendezVous.getAgentAssurance().getNom() : "Non spécifié") + "\n" +
                "Statut : " + rendezVous.getStatut() + "\n\n" +
                "Si vous devez annuler ou reprogrammer, veuillez nous contacter.\n" +
                "Cordialement,\nL'équipe de gestion des rendez-vous");

        try {
            mailSender.send(message);
            System.out.println("E-mail envoyé avec succès à : " + rendezVous.getEmailClient());
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi de l'e-mail à " + rendezVous.getEmailClient() + " : " + e.getMessage());
            throw e;
        }
    }
}