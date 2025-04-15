package tn.esprit.partenaireservice.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.partenaireservice.Entity.OffrePartenaire;

import java.util.List;

public interface OffrePartenaireRepository extends JpaRepository<OffrePartenaire, Long> {


    List<OffrePartenaire> findByTypeOffre(String typeOffre);

    public List<OffrePartenaire> findAll();

<<<<<<< HEAD


=======
    @Query("SELECT o FROM OffrePartenaire o WHERE o.typeOffre = :typeOffre " +
            "AND o.partenaire.latitude = :latitude AND o.partenaire.longitude = :longitude")
    List<OffrePartenaire> findByLocalisationAndType(String typeOffre, Double latitude, Double longitude);

>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
}
