package tn.esprit.Microservice_Assurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Assurance.model.Facture;
import tn.esprit.Microservice_Assurance.model.StatutFacture;

import java.util.List;
import java.util.Optional;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

    // Trouver toutes les factures d'un client
//    List<Facture> findByClientId(Long clientId);

    // Trouver toutes les factures payées
    List<Facture> findByStatut(StatutFacture statut);

    // Trouver la facture liée à un contrat spécifique
    Optional<Facture> findByContratId(Long contratId);
}

