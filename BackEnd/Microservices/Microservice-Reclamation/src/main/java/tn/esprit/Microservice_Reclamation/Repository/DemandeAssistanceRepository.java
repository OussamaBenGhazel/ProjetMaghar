package tn.esprit.Microservice_Reclamation.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Reclamation.Entity.DemandeAssistance;

@Repository
public interface DemandeAssistanceRepository extends JpaRepository<DemandeAssistance, Long> {

}

