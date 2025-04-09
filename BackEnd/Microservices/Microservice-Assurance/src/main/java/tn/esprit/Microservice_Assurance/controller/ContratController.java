package tn.esprit.Microservice_Assurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.service.ContratServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contrats")
public class ContratController {

    @Autowired
    private ContratServiceImpl contratService;

    /**
     * Créer un contrat pour un utilisateur à partir d'une assurance.
     */
    @PostMapping("/create-from-assurance/{assuranceId}/{userId}")
    public ResponseEntity<Contrat> createContratFromAssurance(
            @PathVariable Long assuranceId,
            @PathVariable Long userId,
            @RequestBody Contrat contrat) {
        try {
            Contrat createdContrat = contratService.createContratFromAssurance(assuranceId, userId, contrat);
            return new ResponseEntity<>(createdContrat, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Créer un contrat
     */
    @PostMapping("/create")
    public ResponseEntity<Contrat> createContrat(@RequestBody Contrat contrat) {
        try {
            Contrat createdContrat = contratService.createContrat(contrat);
            return new ResponseEntity<>(createdContrat, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Mettre à jour un contrat
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Contrat> updateContrat(
            @PathVariable Long id,
            @RequestBody Contrat contrat) {
        try {
            Contrat updatedContrat = contratService.updateContrat(id, contrat);
            return new ResponseEntity<>(updatedContrat, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Supprimer un contrat
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteContrat(@PathVariable Long id) {
        try {
            contratService.deleteContrat(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Récupérer tous les contrats
     */
    @GetMapping("/all")
    public ResponseEntity<List<Contrat>> getAllContrats() {
        try {
            List<Contrat> contrats = contratService.getAllContrats();
            return new ResponseEntity<>(contrats, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Récupérer un contrat par son ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Contrat> getContratById(@PathVariable Long id) {
        Optional<Contrat> contrat = contratService.getContratById(id);
        if (contrat.isPresent()) {
            return new ResponseEntity<>(contrat.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Affecter un contrat à un utilisateur existant.
     */
    @PutMapping("/assign/{contratId}/{userId}")
    public ResponseEntity<Contrat> affecterContratAUtilisateur(
            @PathVariable Long contratId,
            @PathVariable Long userId) {
        try {
            Contrat updatedContrat = contratService.affecterContratAUtilisateur(contratId, userId);
            return new ResponseEntity<>(updatedContrat, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Signer un contrat
     */
    @PutMapping("/sign/{id}")
    public ResponseEntity<Contrat> signerContrat(
            @PathVariable Long id,
            @RequestParam String signatureBase64) {
        try {
            Contrat signedContrat = contratService.signerContrat(id, signatureBase64);
            return new ResponseEntity<>(signedContrat, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
