package tn.esprit.Microservice_Rendezvous;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AgentRepository extends JpaRepository<AgentAssurance, Long> {
    AgentAssurance findFirstByOrderByIdAsc();
}
