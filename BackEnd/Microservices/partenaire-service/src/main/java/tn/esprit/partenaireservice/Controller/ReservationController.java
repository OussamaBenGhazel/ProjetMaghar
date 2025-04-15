package tn.esprit.partenaireservice.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.partenaireservice.Entity.Reservation;
import tn.esprit.partenaireservice.Services.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping("/create/{userId}/{offreId}")
    public ResponseEntity<Reservation> createReservation(
            @PathVariable Long userId,
            @PathVariable Long offreId,
            @RequestBody Reservation reservation) {
        Reservation savedReservation = reservationService.createReservation(userId, offreId, reservation);
        return ResponseEntity.ok(savedReservation);
    }
<<<<<<< HEAD
=======
    
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
}

