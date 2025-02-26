package tn.esprit.Microservice_Avis.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Microservice_Avis.exceptions.ResourceNotFoundException;
import tn.esprit.Microservice_Avis.models.Avis;
import tn.esprit.Microservice_Avis.requests.AvisRequest;
import tn.esprit.Microservice_Avis.services.AvisService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/avis")
@RequiredArgsConstructor
public class AvisController {

    private final AvisService avisService;

    // Create or update an Avis
    @PostMapping
    public ResponseEntity<Avis> createAvis(@Valid @RequestBody AvisRequest avis) {
        Avis savedAvis = avisService.saveAvis(avis);
        return new ResponseEntity<>(savedAvis, CREATED);
    }

    // Update Avis by ID
    @PutMapping("/{id}")
    public ResponseEntity<Avis> updateAvis(@PathVariable Long id, @Valid @RequestBody AvisRequest avisRequest) {
        Avis updatedAvis = avisService.updateAvis(id, avisRequest);
        return new ResponseEntity<>(updatedAvis, OK);
    }


    // Get all Avis
    @GetMapping
    public ResponseEntity<List<Avis>> getAllAvis() {
        List<Avis> avisList = avisService.getAllAvis();
        return new ResponseEntity<>(avisList, OK);
    }

    // Get Avis by ID
    @GetMapping("/{id}")
    public ResponseEntity<Avis> getAvisById(@PathVariable Long id) {
        Avis avis = avisService
                .getAvisById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis not found with id: " + id));
        return new ResponseEntity<>(avis, OK);
    }

    // Delete Avis by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvis(@PathVariable Long id) {
        avisService.deleteAvis(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Avis>> getPaginatedAvis(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(avisService.getPaginatedAvis(pageable));
    }


    @GetMapping("/greater-than/{note}")
    public ResponseEntity<List<Avis>> getAvisByNoteGreaterThan(@PathVariable Double note) {
        return ResponseEntity.ok(avisService.getAvisByNoteGreaterThan(note));
    }

    @GetMapping("/less-than/{note}")
    public ResponseEntity<List<Avis>> getAvisByNoteLessThan(@PathVariable Double note) {
        return ResponseEntity.ok(avisService.getAvisByNoteLessThan(note));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Avis>> getAvisByCommentaireContains(@RequestParam String keyword) {
        return ResponseEntity.ok(avisService.getAvisByCommentaireContains(keyword));
    }

}


