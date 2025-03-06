package tn.esprit.Microservice_Reclamation.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    // Get a reclamation by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable Long id) {
        Reclamation reclamation = reclamationService.getReclamationById(id);
        return ResponseEntity.ok(reclamation);
    }


    @PostMapping("/add")
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        Reclamation createdReclamation = reclamationService.createReclamation(reclamation);
        return ResponseEntity.status(201).body(createdReclamation);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody Reclamation newReclamation) {
        Reclamation updatedReclamation = reclamationService.updateReclamation(id, newReclamation);
        return ResponseEntity.ok(updatedReclamation);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
        return ResponseEntity.noContent().build();
    }




    @PutMapping("/{id}/status")
    public ResponseEntity<Reclamation> updateStatut(@PathVariable Long id, @RequestParam String statut) {
        try {
            Statut newStatut = Statut.valueOf(statut);  // Convert the statut string to an enum
            Reclamation updatedReclamation = reclamationService.updateStatut(id, newStatut);
            return ResponseEntity.ok(updatedReclamation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(null);  // Invalid statut value
        }
    }
}
