package tn.esprit.partenaireservice.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.partenaireservice.Entity.Partenaire;

import java.util.List;

public interface PartenaireRepository extends JpaRepository<Partenaire, Long> {
    List<Partenaire> findByType(String type);
}
