package tn.esprit.Microservice_Assurance.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Assurance.model.Devis;
import tn.esprit.Microservice_Assurance.model.StatutDevis;

import java.util.List;

@Repository
public interface DevisRepository extends JpaRepository<Devis, Long> {

//    // Trouver les devis d'un client spécifique
//    List<Devis> findByClientId(Long clientId);
//
//    // Trouver les devis non confirmés d'un client
//    List<Devis> findByClientIdAndStatut(Long clientId, StatutDevis statut);

//    // Supprimer les devis anciens non confirmés
//    @Transactional
//    @Modifying
//    @Query("DELETE FROM Devis d WHERE d.createdAt < :date AND d.statut = 'EN_ATTENTE'")
//    void deleteOldDevis(@Param("date") LocalDateTime date);
}

