package tn.esprit.Microservice_Rendezvous;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    // Trouver les rendez-vous d'un agent à une date et heure spécifiques
    @Query("SELECT r FROM RendezVous r WHERE r.agentAssurance.id = :agentId AND r.dateHeure = :dateHeure AND r.statut != 'Annulé'")
    List<RendezVous> findByAgentAssuranceIdAndDateHeure(Long agentId, LocalDateTime dateHeure);

    // Trouver tous les rendez-vous d'un agent
    List<RendezVous> findByAgentAssurance_Id(Long agentId);

    List<RendezVous> findByDateHeureBetweenAndRappelEnvoyeFalse(LocalDateTime start, LocalDateTime end);}