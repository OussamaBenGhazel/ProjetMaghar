package tn.esprit.Microservice_Rendezvous;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateHeure;
    private String statut;

    private String nomClient;
    private String emailClient;
    private String numeroTelephoneClient;

    @ManyToOne
    @JoinColumn(name = "agent_id", nullable = true)
    private AgentAssurance agentAssurance;

    private boolean rappelEnvoye = false; // Champ pour indiquer si le rappel a été envoyé
}