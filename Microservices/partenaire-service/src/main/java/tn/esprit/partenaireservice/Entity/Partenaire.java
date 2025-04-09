package tn.esprit.partenaireservice.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Partenaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String type; // Garage, Clinique, etc.
    private String adresse;
    private String telephone;
    private Double latitude;
    private Double longitude;
}
