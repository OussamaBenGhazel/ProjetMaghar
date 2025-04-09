package tn.esprit.Microservice_Assurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Assurance.model.Assurance;
import tn.esprit.Microservice_Assurance.model.TypeAssurance;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssuranceRepository extends JpaRepository<Assurance, Long> {

    // Trouver les assurances par type (SANTÉ, AUTOMOBILE, VOYAGE, HABITATION)
    List<Assurance> findByType(TypeAssurance type);

    // Rechercher une assurance par son nom
    Optional<Assurance> findByNom(String nom);


}

