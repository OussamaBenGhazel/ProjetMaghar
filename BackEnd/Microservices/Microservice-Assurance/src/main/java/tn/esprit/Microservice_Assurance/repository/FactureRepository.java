package tn.esprit.Microservice_Assurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.model.Facture;
import tn.esprit.Microservice_Assurance.model.StatutFacture;

import java.util.List;
import java.util.Optional;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

    // Vérifier si une facture existe déjà pour un contrat
    boolean existsByContrat(Contrat contrat);

    // Rechercher une facture par l'URL de paiement (contenant le sessionId)
    Optional<Facture> findByUrlPaiementContaining(String sessionId);

    // Trouver toutes les factures pour un contrat spécifique

    Optional<Facture> findByContratId(Long contratId);


    // Trouver les factures par statut
    List<Facture> findByStatut(Facture statut);

    Optional<Facture> findByReferencePaiement(String referencePaiement);

}