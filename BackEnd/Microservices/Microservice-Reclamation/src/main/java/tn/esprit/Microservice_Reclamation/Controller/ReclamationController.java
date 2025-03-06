package Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Reclamation.Entity.Reclamation;
import tn.esprit.Microservice_Reclamation.Service.ReclamationService;

import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin(origins = "*")
public class ReclamationController {

    @Autowired
    private ReclamationService reclamationService;

    // Get all reclamations
    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    // Get a reclamation by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable Long id) {
        Reclamation reclamation = reclamationService.getReclamationById(id);
        return reclamation != null ? ResponseEntity.ok(reclamation) : ResponseEntity.notFound().build();
    }

    // Submit a reclamation via a simple form
    @PostMapping("/submit")
    public ResponseEntity<Reclamation> submitReclamation(@RequestBody Reclamation reclamation) {
        return ResponseEntity.ok(reclamationService.submitReclamation(reclamation));
    }

    // Create a new reclamation (CRUD)
    @PostMapping
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        return ResponseEntity.ok(reclamationService.createReclamation(reclamation));
    }

    // Update an existing reclamation (CRUD)
    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody Reclamation newReclamation) {
        Reclamation updatedReclamation = reclamationService.updateReclamation(id, newReclamation);
        return updatedReclamation != null ? ResponseEntity.ok(updatedReclamation) : ResponseEntity.notFound().build();
    }

    // Delete a reclamation by its ID (CRUD)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
        return ResponseEntity.noContent().build();
    }

    // Update the status of a reclamation
    @PutMapping("/{id}/status")
    public ResponseEntity<Reclamation> updateStatut(@PathVariable Long id, @RequestParam String statut) {
        Reclamation updatedReclamation = reclamationService.updateStatut(id, statut);
        return updatedReclamation != null ? ResponseEntity.ok(updatedReclamation) : ResponseEntity.notFound().build();
    }

    // Assign a reclamation to an agent
    @PutMapping("/{id}/assign")
    public ResponseEntity<Reclamation> assignToAgent(@PathVariable Long id, @RequestParam String agent) {
        Reclamation updatedReclamation = reclamationService.assignToAgent(id, agent);
        return updatedReclamation != null ? ResponseEntity.ok(updatedReclamation) : ResponseEntity.notFound().build();
    }
}
