package tn.esprit.Microservice_Assurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Assurance.model.Assurance;
import tn.esprit.Microservice_Assurance.model.TypeAssurance;
import tn.esprit.Microservice_Assurance.service.AssuranceService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:62366")

@RestController
@RequestMapping("/api/assurances")
public class AssuranceController {

    private final AssuranceService assuranceService;

    @Autowired
    public AssuranceController(AssuranceService assuranceService) {
        this.assuranceService = assuranceService;
    }

    @PostMapping
    public ResponseEntity<Assurance> createAssurance(@RequestBody Assurance assurance) {
        Assurance newAssurance = assuranceService.createAssurance(assurance);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAssurance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assurance> updateAssurance(@PathVariable("id") Long id, @RequestBody Assurance assurance) {
        // Appel du service pour mettre à jour l'assurance
        Assurance updatedAssurance = assuranceService.updateAssurance(id, assurance);

        if (updatedAssurance == null) {
            return ResponseEntity.notFound().build(); // Si l'assurance n'existe pas
        }

        return ResponseEntity.ok(updatedAssurance); // Retourne l'assurance mise à jour
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssurance(@PathVariable Long id) {
        assuranceService.deleteAssurance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Assurance>> getAllAssurances() {
        List<Assurance> assurances = assuranceService.getAllAssurances();
        return ResponseEntity.ok(assurances);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assurance> getAssuranceById(@PathVariable Long id) {
        Assurance assurance = assuranceService.getAssuranceById(id);
        return ResponseEntity.ok(assurance);
    }
    // Dans AssuranceController.java
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Assurance>> getAssurancesByType(@PathVariable TypeAssurance type) {
        List<Assurance> assurances = assuranceService.getAssurancesByType(type);
        return ResponseEntity.ok(assurances);
    }
}

