package tn.esprit.partenaireservice.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.partenaireservice.Entity.OffrePartenaire;
import tn.esprit.partenaireservice.Entity.Reservation;
import tn.esprit.partenaireservice.Entity.UserDTO;
import tn.esprit.partenaireservice.FeignClient.UserClient;
import tn.esprit.partenaireservice.Repository.OffrePartenaireRepository;
import tn.esprit.partenaireservice.Repository.ReservationRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private OffrePartenaireRepository offrePartenaireRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private EmailService emailService; // Injecter EmailService

    public Reservation createReservation(Long userId, Long offreId, Reservation reservation) {
        // Vérifier si l'utilisateur existe via le microservice user
        UserDTO user = userClient.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }

        // Récupérer l'offre et vérifier si elle existe
        OffrePartenaire offre = offrePartenaireRepository.findById(offreId)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée avec l'ID : " + offreId));

        // Vérifier si l'offre a encore des places disponibles
        if (offre.getNombrePlaces() <= 0) {
            throw new RuntimeException("Plus de places disponibles pour cette offre !");
        }

        // Vérifier si la date de fin est dépassée
        if (offre.getDateFin() != null && offre.getDateFin().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cette offre a expiré !");
        }

        // Diminuer le nombre de places disponibles
        offre.setNombrePlaces(offre.getNombrePlaces() - 1);
        offrePartenaireRepository.save(offre);

        // Enregistrer la réservation
        reservation.setUserId(userId);
        reservation.setOffreId(offreId);
        reservation.setDateReservation(LocalDateTime.now());

        Reservation savedReservation = reservationRepository.save(reservation);

        // Envoyer l'email de confirmation à l'utilisateur
        String subject = "Confirmation de votre réservation";
        String body = "Bonjour " + user.getNom() + ",\n\n" +
                "Votre réservation pour l'offre : " + offre.getTypeOffre() + " a été confirmée.\n" +
                "Détails de l'offre :\n" +
                "Prix : " + offre.getPrix() + "€\n" +
                "Localisation : " + offre.getLocalisation() + "\n" +
                "Date de la réservation : " + reservation.getDateReservation() + "\n\n" +
                "Merci pour votre réservation !";
        emailService.sendReservationEmail(user.getEmail(), subject, body);

        return savedReservation;
    }
}
