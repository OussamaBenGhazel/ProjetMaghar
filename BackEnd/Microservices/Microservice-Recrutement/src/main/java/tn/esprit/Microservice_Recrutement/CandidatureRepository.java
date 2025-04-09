package tn.esprit.Microservice_Recrutement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findByOffreEmploi_Id(Long offreId);
    @Query("SELECT c FROM Candidature c JOIN FETCH c.offreEmploi")
    List<Candidature> findAllWithOffre();


}