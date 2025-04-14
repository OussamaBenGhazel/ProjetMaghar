package tn.esprit.Microservice_Reclamation.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.Microservice_Reclamation.Entity.Reclamation;
import tn.esprit.Microservice_Reclamation.Entity.Statut;
import tn.esprit.Microservice_Reclamation.Repository.ReclamationRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Récupérer toutes les réclamations
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    // Récupérer une réclamation par son ID
    public Reclamation getReclamationById(Long id) {
        return reclamationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Réclamation non trouvée avec l'id : " + id));
    }

    // Méthode pour soumettre une réclamation (création ou mise à jour)
    private Reclamation soumettreReclamation(Reclamation reclamation) {
        if (reclamation.getDateCreation() == null) {
            reclamation.setDateCreation(LocalDate.now());
        }
        if (reclamation.getStatut() == null) {
            reclamation.setStatut(Statut.EN_ATTENTE);
        }
        return reclamationRepository.save(reclamation);
    }

    // Créer une nouvelle réclamation
    public Reclamation createReclamation(Reclamation reclamation) {
        // Générer un code unique s'il n'est pas défini ou s'il vaut "N/A"
        if (reclamation.getCodeReclamation() == null || reclamation.getCodeReclamation().equals("N/A")) {
            String codeGenere = "REC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            reclamation.setCodeReclamation(codeGenere);
        }
        // Enregistrer la réclamation en base
        Reclamation reclamationCreer = soumettreReclamation(reclamation);
        // Envoyer l'email de confirmation (si une erreur se produit, on logge l'erreur sans empêcher l'enregistrement)
        try {
            envoyerEmailConfirmation(reclamationCreer);
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi de l'email : " + e.getMessage());
        }
        return reclamationCreer;
    }

    // Mettre à jour une réclamation existante
    @Transactional
    public Reclamation mettreAJourReclamation(Long id, Reclamation nouvelleReclamation) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Réclamation non trouvée avec l'id : " + id));
        reclamation.setClientName(nouvelleReclamation.getClientName());
        reclamation.setTypeReclamation(nouvelleReclamation.getTypeReclamation());
        reclamation.setTitre(nouvelleReclamation.getTitre());
        reclamation.setDescription(nouvelleReclamation.getDescription());
        return soumettreReclamation(reclamation);
    }

    // Supprimer une réclamation
    public void supprimerReclamation(Long id) {
        if (!reclamationRepository.existsById(id)) {
            throw new EntityNotFoundException("Réclamation non trouvée avec l'id : " + id);
        }
        reclamationRepository.deleteById(id);
    }

    // Mettre à jour le statut d'une réclamation
    public Reclamation mettreAJourStatut(Long id, Statut nouveauStatut) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Réclamation non trouvée avec l'id : " + id));
        validerTransitionStatut(reclamation.getStatut(), nouveauStatut);
        reclamation.setStatut(nouveauStatut);
        return reclamationRepository.save(reclamation);
    }

    // Valider la transition entre les statuts
    private void validerTransitionStatut(Statut statutActuel, Statut nouveauStatut) {
        switch (nouveauStatut) {
            case EN_COURS:
                if (statutActuel != Statut.EN_ATTENTE) {
                    throw new IllegalStateException("La réclamation doit être en 'En attente' pour passer à 'En cours'");
                }
                break;
            case TERMINE:
                if (statutActuel != Statut.EN_COURS) {
                    throw new IllegalStateException("La réclamation doit être en 'En cours' pour passer à 'Terminé'");
                }
                break;
            default:
                throw new IllegalStateException("Transition de statut invalide");
        }
    }

    // Envoyer un email de confirmation au client
    public void envoyerEmailConfirmation(Reclamation reclamation) {
        String destinataire = (reclamation.getEmail() != null && !reclamation.getEmail().isEmpty())
                ? reclamation.getEmail()
                : "client@example.com";

        String sujet = "Confirmation de votre réclamation";

        String corps = "Bonjour " + reclamation.getClientName() + ",\n\n" +
                "Merci d'avoir soumis votre réclamation. Voici les détails :\n" +
                "ID de la réclamation : " + reclamation.getCodeReclamation() + "\n" +
                "Type : " + reclamation.getTypeReclamation() + "\n" +
                "Titre : " + reclamation.getTitre() + "\n" +
                "Description : " + reclamation.getDescription() + "\n\n" +
                "Nous allons traiter votre réclamation et reviendrons vers vous sous peu.\n\n" +
                "Cordialement,\n" +
                "L'équipe des réclamations";

        try {
            // Création du message
            var message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Utiliser une adresse "From" valide et vérifiée
            helper.setFrom("fehd.ounis@esprit.tn"); // Spécifie un expéditeur ici (vérifiez que l'email est valide et authentifié)

            // Spécifiez un email valide comme destinataire
            helper.setTo(destinataire);
            helper.setSubject(sujet);
            helper.setText(corps);

            // Si vous souhaitez inclure un "Reply-To", utilisez un email valide
            helper.setReplyTo("noreply@esprit.tn"); // Exemple de "Reply-To", doit être un email valide

            // Envoi de l'email
            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace(); // ou utilisez un logger en production
        }
    }
}