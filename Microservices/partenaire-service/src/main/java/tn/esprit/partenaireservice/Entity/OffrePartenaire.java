package tn.esprit.partenaireservice.Entity;

import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne
    private Partenaire partenaire;
}
