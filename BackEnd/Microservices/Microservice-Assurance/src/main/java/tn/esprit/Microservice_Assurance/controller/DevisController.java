package tn.esprit.Microservice_Assurance.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Assurance.model.Devis;
import tn.esprit.Microservice_Assurance.service.DevisService;

import java.util.List;

@RestController
@RequestMapping("/api/devis")
public class DevisController {

    private final DevisService devisService;

    @Autowired
    public DevisController(DevisService devisService) {
        this.devisService = devisService;
    }

    // Créer un devis
    @PostMapping
    public ResponseEntity<Devis> createDevis(@RequestBody Devis devis) {
        Devis newDevis = devisService.createDevis(devis);
        return ResponseEntity.status(HttpStatus.CREATED).body(newDevis);
    }

    // Mettre à jour un devis
    @PutMapping("/{id}")
    public ResponseEntity<Devis> updateDevis(@PathVariable Long id, @RequestBody Devis devis) {
        Devis updatedDevis = devisService.updateDevis(id, devis);
        return ResponseEntity.ok(updatedDevis);
    }

    // Supprimer un devis
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevis(@PathVariable Long id) {
        devisService.deleteDevis(id);
        return ResponseEntity.noContent().build();
    }

    // Récupérer tous les devis
    @GetMapping
    public ResponseEntity<List<Devis>> getAllDevis() {
        List<Devis> devisList = devisService.getAllDevis();
        return ResponseEntity.ok(devisList);
    }

    // Récupérer un devis par ID
    @GetMapping("/{id}")
    public ResponseEntity<Devis> getDevisById(@PathVariable Long id) {
        Devis devis = devisService.getDevisById(id);
        return ResponseEntity.ok(devis);
    }
}