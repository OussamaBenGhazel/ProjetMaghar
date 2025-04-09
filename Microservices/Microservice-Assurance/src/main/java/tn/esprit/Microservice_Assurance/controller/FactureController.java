package tn.esprit.Microservice_Assurance.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Assurance.model.Facture;
import tn.esprit.Microservice_Assurance.service.FactureService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/factures")
public class FactureController {

    private final FactureService factureService;

    @Autowired
    public FactureController(FactureService factureService) {
        this.factureService = factureService;
    }

    // Créer une nouvelle facture
    @PostMapping("/create")
    public ResponseEntity<Facture> createFacture(@RequestBody Facture facture) {
        Facture createdFacture = factureService.createFacture(facture);
        return new ResponseEntity<>(createdFacture, HttpStatus.CREATED);
    }

    // Créer une facture à partir d'un contrat
    @PostMapping("/createFromContrat/{contratId}")
    public ResponseEntity<Facture> createFactureFromContrat(@PathVariable Long contratId) {
        Facture createdFacture = factureService.createFactureFromContrat(contratId);
        return new ResponseEntity<>(createdFacture, HttpStatus.CREATED);
    }

    // Récupérer une facture par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Facture> getFactureById(@PathVariable Long id) {
        Optional<Facture> facture = factureService.getFactureById(id);
        return facture.map(f -> new ResponseEntity<>(f, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Récupérer toutes les factures
    @GetMapping("/")
    public ResponseEntity<List<Facture>> getAllFactures() {
        List<Facture> factures = factureService.getAllFactures();
        return new ResponseEntity<>(factures, HttpStatus.OK);
    }

    // Mettre à jour une facture
    @PutMapping("/update/{id}")
    public ResponseEntity<Facture> updateFacture(@PathVariable Long id, @RequestBody Facture facture) {
        Facture updatedFacture = factureService.updateFacture(id, facture);
        return new ResponseEntity<>(updatedFacture, HttpStatus.OK);
    }

    // Supprimer une facture
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
