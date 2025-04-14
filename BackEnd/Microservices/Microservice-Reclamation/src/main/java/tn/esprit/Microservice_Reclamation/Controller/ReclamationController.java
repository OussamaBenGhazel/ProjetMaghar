package tn.esprit.Microservice_Reclamation.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Reclamation.Entity.Reclamation;
import tn.esprit.Microservice_Reclamation.Entity.Statut;
import tn.esprit.Microservice_Reclamation.Service.ReclamationService;

import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin(origins = "*")
public class ReclamationController {

    @Autowired
    private ReclamationService reclamationService;

    // Créer une réclamation
    @PostMapping("/add")
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        Reclamation createdReclamation = reclamationService.createReclamation(reclamation);
        return new ResponseEntity<>(createdReclamation, HttpStatus.CREATED);
    }

    // Récupérer toutes les réclamations
    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    // Récupérer une réclamation par ID
    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable Long id) {
        return ResponseEntity.ok(reclamationService.getReclamationById(id));
    }

    // Mettre à jour une réclamation existante
    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody Reclamation newReclamation) {
        Reclamation updatedReclamation = reclamationService.mettreAJourReclamation(id, newReclamation);
        return ResponseEntity.ok(updatedReclamation);
    }

    // Supprimer une réclamation par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        reclamationService.supprimerReclamation(id);
        return ResponseEntity.noContent().build();
    }

    // Mettre à jour le statut d'une réclamation
    @PutMapping("/{id}/status")
    public ResponseEntity<Reclamation> updateStatut(@PathVariable Long id, @RequestParam String statut) {
        try {
            Statut newStatut = Statut.valueOf(statut);
            Reclamation updatedReclamation = reclamationService.mettreAJourStatut(id, newStatut);
            return ResponseEntity.ok(updatedReclamation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(null);
        }
    }
}
