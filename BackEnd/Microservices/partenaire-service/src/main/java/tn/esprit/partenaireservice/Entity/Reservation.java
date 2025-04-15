package tn.esprit.partenaireservice.Entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // ID de l'utilisateur venant de user-service
    private Long offreId; // ID de l'offre choisie

    private LocalDateTime dateReservation;

<<<<<<< HEAD
    @ManyToOne
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offreId", insertable = false, updatable = false)
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
    OffrePartenaire offrepartenaire;

}

