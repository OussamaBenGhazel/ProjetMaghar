package tn.esprit.Microservice_Recrutement;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffreEmploi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Correction de l'ID

    public boolean isPublished() {
        return isPublished;
    }



    private String titre;
    private String description;
    private String categorie;
    private String localisation;
    private Double salaireMin;
    private Double salaireMax;
    private String typeContrat;
    private LocalDate datePublication;
    private LocalDate dateExpiration;
    private String niveauExperience;
    private String competencesRequises;
    private boolean isPublished; // Ajout du champ pour indiquer si l’offre a été publiée
    @OneToMany(mappedBy = "offreEmploi", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference  // Gère la sérialisation côté "OffreEmploi"
    private List<Candidature> candidatures;

    public void setIsPublished(boolean b) {
        this.isPublished = b;
    }
}
