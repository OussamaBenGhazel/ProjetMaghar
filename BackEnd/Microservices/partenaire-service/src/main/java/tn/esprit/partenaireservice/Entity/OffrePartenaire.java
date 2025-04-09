package tn.esprit.partenaireservice.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OffrePartenaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_offre", nullable = false)
    private String typeOffre; // Voiture, Santé, etc.

    private String description;
    private Double prix;

    @Column(name = "localisation")
    private String localisation;

    @NotNull
    private int nombrePlaces;  // Ajout du nombre de places disponibles
    private LocalDate dateFin; // Ajout de la date de fin

    @ManyToOne
    private Partenaire partenaire;


}
