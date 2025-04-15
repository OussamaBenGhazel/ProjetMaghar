package tn.esprit.partenaireservice.Services;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.partenaireservice.Entity.Reservation;
import tn.esprit.partenaireservice.Entity.UserDTO;
import tn.esprit.partenaireservice.FeignClient.UserClient;
import tn.esprit.partenaireservice.Repository.OffrePartenaireRepository;
import tn.esprit.partenaireservice.Repository.ReservationRepository;

import java.time.LocalDateTime;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
@Autowired
    OffrePartenaireRepository offrePartenaireRepository;
    @Autowired
    private UserClient userClient; // 🔥 Injecte Feign Client

    public Reservation createReservation(Long userId, Long offreId, Reservation reservation) {
        // Vérifier si l'utilisateur existe via le microservice user
        UserDTO user = userClient.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }

        // 🔥 Vérifier si l'offre existe avant d'enregistrer la réservation
        if (!offrePartenaireRepository.existsById(offreId)) {
            throw new RuntimeException("Offre non trouvée avec l'ID : " + offreId);
        }

        // Compléter les informations de la réservation
        reservation.setUserId(userId);
        reservation.setOffreId(offreId);
        reservation.setDateReservation(LocalDateTime.now());

        // Sauvegarder la réservation dans la base de données
        return reservationRepository.save(reservation);
    }

}
