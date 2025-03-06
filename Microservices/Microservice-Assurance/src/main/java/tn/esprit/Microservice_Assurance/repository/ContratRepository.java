package tn.esprit.Microservice_Assurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.model.StatutContrat;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Long> {


    // Trouver un contrat par numéro de contrat
    Optional<Contrat> findByNumeroContrat(String numeroContrat);

}

