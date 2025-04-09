package tn.esprit.Microservice_Recrutement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/offres")
@CrossOrigin(origins = "http://localhost:4200")
public class OffreEmploiController {

    @Autowired
    private OffreEmploiRepository offreEmploiRepository;

    @GetMapping
    public List<OffreEmploiDTO> getAllOffres() {
        List<OffreEmploi> offres = offreEmploiRepository.findAll();
        return offres.stream()
                .map(OffreEmploiDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<OffreEmploi> createOffre(@RequestBody OffreEmploi offreEmploi) {
        OffreEmploi savedOffre = offreEmploiRepository.save(offreEmploi);
        return ResponseEntity.ok(savedOffre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OffreEmploi> updateOffre(@PathVariable Long id, @RequestBody OffreEmploi offreDetails) {
        OffreEmploi offre = offreEmploiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
        offre.setTitre(offreDetails.getTitre());
        offre.setDescription(offreDetails.getDescription());
        offre.setCategorie(offreDetails.getCategorie());
        offre.setLocalisation(offreDetails.getLocalisation());
        offre.setSalaireMin(offreDetails.getSalaireMin());
        offre.setSalaireMax(offreDetails.getSalaireMax());
        offre.setTypeContrat(offreDetails.getTypeContrat());
        offre.setCompetencesRequises(offreDetails.getCompetencesRequises());
        OffreEmploi updatedOffre = offreEmploiRepository.save(offre);
        return ResponseEntity.ok(updatedOffre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable Long id) {
        OffreEmploi offre = offreEmploiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
        offreEmploiRepository.delete(offre);
        return ResponseEntity.ok().build();
    }
}