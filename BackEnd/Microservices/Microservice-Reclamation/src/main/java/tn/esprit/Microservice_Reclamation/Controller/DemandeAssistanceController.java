package tn.esprit.Microservice_Reclamation.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Reclamation.Entity.DemandeAssistance;
import tn.esprit.Microservice_Reclamation.Service.DemandeAssistanceService;

import java.util.List;


@RestController
@RequestMapping("/api/demandes-assistance")
@CrossOrigin(origins = "*")
public class DemandeAssistanceController {

    @Autowired
    private DemandeAssistanceService demandeAssistanceService;


    @GetMapping
    public ResponseEntity<List<DemandeAssistance>> getAllDemandes() {
        List<DemandeAssistance> demandes = demandeAssistanceService.getAllDemandes();
        return ResponseEntity.ok(demandes);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DemandeAssistance> getDemandeById(@PathVariable Long id) {
        DemandeAssistance demande = demandeAssistanceService.getDemandeById(id);
        return ResponseEntity.ok(demande);
    }


    @PostMapping("/add")
    public ResponseEntity<DemandeAssistance> createDemande(@RequestBody DemandeAssistance demandeAssistance) {
        DemandeAssistance createdDemande = demandeAssistanceService.createDemande(demandeAssistance);
        return ResponseEntity.status(201).body(createdDemande);
    }


    @PutMapping("/{id}")
    public ResponseEntity<DemandeAssistance> updateDemande(@PathVariable Long id, @RequestBody DemandeAssistance newDemandeAssistance) {
        DemandeAssistance updatedDemande = demandeAssistanceService.updateDemande(id, newDemandeAssistance);
        return ResponseEntity.ok(updatedDemande);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemande(@PathVariable Long id) {
        demandeAssistanceService.deleteDemande(id);
        return ResponseEntity.noContent().build();
    }


}
