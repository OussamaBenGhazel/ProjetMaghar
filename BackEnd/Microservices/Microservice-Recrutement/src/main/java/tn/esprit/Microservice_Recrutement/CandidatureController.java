// CandidatureController.java
package tn.esprit.Microservice_Recrutement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/candidatures")
public class CandidatureController {
    @Autowired
    private CandidatureRepository repository;
    @Autowired
    private OffreEmploiRepository orepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String IA_SERVICE_URL = "http://127.0.0.1:5000/analyze-cv"; // URL locale

    @PostMapping
    public ResponseEntity<Candidature> createCandidature(@RequestBody Candidature candidature) {
        if (candidature.getOffreEmploi() != null && candidature.getOffreEmploi().getId() != null) {
            OffreEmploi offreEmploi = orepository.findById(candidature.getOffreEmploi().getId())
                    .orElseThrow(() -> new RuntimeException("Offre non trouvée"));
            candidature.setOffreEmploi(offreEmploi);
        }
        candidature.setStatut("En attente");
        Candidature savedCandidature = repository.save(candidature);

        try {
            String cvUrl = candidature.getCvUrl();
            System.out.println("URL envoyée à Flask : " + cvUrl); // Log pour vérifier
            String analyseResult = restTemplate.postForObject(IA_SERVICE_URL, cvUrl, String.class);
            savedCandidature.setAnalyseResult(analyseResult);
            repository.save(savedCandidature);
        } catch (Exception e) {
            System.err.println("Erreur lors de l’analyse du CV : " + e.getMessage());
        }

        return ResponseEntity.ok(savedCandidature);
    }

    @GetMapping("/with-offre")
    public List<CandidatureDTO> getAllCandidaturesWithOffre() {
        List<Candidature> candidatures = repository.findAllWithOffre();
        return candidatures.stream()
                .map(CandidatureDTO::new)
                .collect(Collectors.toList());
    }
}