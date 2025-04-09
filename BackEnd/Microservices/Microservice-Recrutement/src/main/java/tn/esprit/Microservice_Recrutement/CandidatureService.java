package tn.esprit.Microservice_Recrutement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatureService {
    private CandidatureRepository repository;
    private OffreEmploiRepository orepository;

    @Autowired
    public CandidatureService(CandidatureRepository repository, OffreEmploiRepository orepository) {
        this.repository = repository;
        this.orepository = orepository;
    }
    public List<Candidature> getAllCandidatures() {
        return repository.findAll();
    }

    public Optional<Candidature> getCandidatureById(Long id) {
        return repository.findById(id);
    }

    public Candidature saveCandidature(Candidature candidature) {
        if (candidature.getOffreEmploi() != null) {
            OffreEmploi offre = orepository.findById(candidature.getOffreEmploi().getId())
                    .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
            candidature.setOffreEmploi(offre);
        }
        return repository.save(candidature);
    }



    public Candidature updateCandidature(Long id, Candidature candidatureDetails) {
        return repository.findById(id).map(candidature -> {
            candidature.setNom(candidatureDetails.getNom());
            candidature.setEmail(candidatureDetails.getEmail());
            candidature.setLettreMotivation(candidatureDetails.getLettreMotivation());
            candidature.setStatut(candidatureDetails.getStatut());
            return repository.save(candidature);
        }).orElseThrow(() -> new RuntimeException("Candidature non trouvée"));
    }

    public void deleteCandidature(Long id) {
        repository.deleteById(id);
    }

    public List<Candidature> getAllCandidaturesWithOffre() {
        return repository.findAll(); // Cette méthode récupère toutes les candidatures avec leurs offres associées
    }

    public List<Candidature> findAll() {
        return repository.findAll();  // Assurez-vous que votre repository est bien configuré

    }
}
