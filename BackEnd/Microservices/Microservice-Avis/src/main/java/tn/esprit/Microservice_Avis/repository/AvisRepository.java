package tn.esprit.Microservice_Avis.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.Microservice_Avis.models.Avis;

import java.util.List;

@Repository
public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> getAvisByNoteGreaterThan(Double note);

    List<Avis> getAvisByNoteLessThan(Double note);

    List<Avis> getAvisByCommentaireContains(String keyword);

    Page<Avis> findAll(Pageable pageable);

}

