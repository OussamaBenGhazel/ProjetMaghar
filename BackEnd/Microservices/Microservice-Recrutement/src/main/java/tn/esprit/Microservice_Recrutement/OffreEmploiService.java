package tn.esprit.Microservice_Recrutement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service

public class OffreEmploiService {
    @Autowired
    private OffreEmploiRepository orepository;

    public List<OffreEmploi> getAllOffres() {
        return orepository.findAll();
    }

    public Optional<OffreEmploi> getOffreById(Long id) {
        return orepository.findById(id);
    }

    public OffreEmploi saveOffre(OffreEmploi offre) {
        return orepository.save(offre);
    }

    public OffreEmploi updateOffre(Long id, OffreEmploi offreDetails) {
        return orepository.findById(id).map(offre -> {
            offre.setTitre(offreDetails.getTitre());
            offre.setDescription(offreDetails.getDescription());
            offre.setCategorie(offreDetails.getCategorie());
            return orepository.save(offre);
        }).orElseThrow(() -> new RuntimeException("Offre non trouvée"));
    }

    public void deleteOffre(Long id) {
        orepository.deleteById(id);
    }

    public Optional<OffreEmploi> findById(Long id) {
        return orepository.findById(id);
    }
}
