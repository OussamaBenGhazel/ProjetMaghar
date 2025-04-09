package tn.esprit.partenaireservice.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.partenaireservice.Entity.OffrePartenaire;

import java.util.List;

public interface OffrePartenaireRepository extends JpaRepository<OffrePartenaire, Long> {

    List<OffrePartenaire> findByTypeOffre(String typeOffre);

    List<OffrePartenaire> findByTypeOffreAndPrixLessThan(String typeOffre, Double prixMax);

    List<OffrePartenaire> findByTypeOffreAndPrixLessThanAndLocalisation(String typeOffre, Double prixMax, String localisation);

    List<OffrePartenaire> findByTypeOffreAndLocalisation(String typeOffre, String localisation);

    List<OffrePartenaire> findByPrixLessThanAndLocalisation(Double prixMax, String localisation);

    // Requête personnalisée pour une recherche insensible à la casse (ajoutée ici pour illustration)
    @Query("SELECT o FROM OffrePartenaire o WHERE LOWER(o.typeOffre) = LOWER(:typeOffre)")
    List<OffrePartenaire> findByTypeOffreIgnoreCase(String typeOffre);
}
