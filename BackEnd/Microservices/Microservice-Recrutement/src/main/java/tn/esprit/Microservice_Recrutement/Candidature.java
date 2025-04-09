package tn.esprit.Microservice_Recrutement;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String email;
    private String cvUrl;
    private String lettreMotivation;
    private String statut;
    private String analyseResult;
    @ManyToOne
    @JoinColumn(name = "offre_id")
    @JsonBackReference  // Empêche la sérialisation du côté "offre" pour éviter la boucle infinie
    private OffreEmploi offreEmploi;


}

