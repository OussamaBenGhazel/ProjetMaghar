package tn.esprit.Microservice_Rendezvous;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentAssurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String specialite; // Spécialité de l'agent, par exemple "Assurance vie", "Assurance automobile"
}