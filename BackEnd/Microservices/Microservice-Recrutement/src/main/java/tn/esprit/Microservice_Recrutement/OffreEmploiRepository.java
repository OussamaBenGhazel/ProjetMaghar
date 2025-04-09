package tn.esprit.Microservice_Recrutement;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
public interface OffreEmploiRepository  extends JpaRepository<OffreEmploi, Long> {
    List<OffreEmploi> findByDatePublicationLessThanEqualAndIsPublishedFalse(LocalDate date);
}
