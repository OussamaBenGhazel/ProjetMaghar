package tn.esprit.Microservice_Assurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.service.ContratService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contrats")
public class ContratController {

    @Autowired
    private ContratService contratService;

    // Créer un contrat
    @PostMapping
    public ResponseEntity<Contrat> createContrat(@RequestBody Contrat contrat) {
        Contrat createdContrat = contratService.createContrat(contrat);
        return ResponseEntity.ok(createdContrat);
    }

    // Mettre à jour un contrat
    @PutMapping("/{id}")
    public ResponseEntity<Contrat> updateContrat(@PathVariable Long id, @RequestBody Contrat contrat) {
        Contrat updatedContrat = contratService.updateContrat(id, contrat);
        return ResponseEntity.ok(updatedContrat);
    }

    // Supprimer un contrat
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContrat(@PathVariable Long id) {
        contratService.deleteContrat(id);
        return ResponseEntity.noContent().build();
    }

    // Obtenir tous les contrats
    @GetMapping
    public ResponseEntity<List<Contrat>> getAllContrats() {
        List<Contrat> contrats = contratService.getAllContrats();
        return ResponseEntity.ok(contrats);
    }

    // Obtenir un contrat par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Contrat> getContratById(@PathVariable Long id) {
        Optional<Contrat> contratOpt = contratService.getContratById(id);
        return contratOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Créer un contrat à partir d'une assurance
    @PostMapping("/from-assurance/{assuranceId}")
    public ResponseEntity<Contrat> createContratFromAssurance(@PathVariable Long assuranceId, @RequestBody Contrat contrat) {
        Contrat createdContrat = contratService.createContratFromAssurance(assuranceId, contrat);
        return ResponseEntity.ok(createdContrat);
    }

    // Créer un contrat à partir d'un devis
    @PostMapping("/from-devis/{devisId}")
    public ResponseEntity<Contrat> createContratFromDevis(@PathVariable Long devisId, @RequestBody Contrat contrat) {
        Contrat createdContrat = contratService.createContratFromDevis(devisId, contrat);
        return ResponseEntity.ok(createdContrat);
    }


}
