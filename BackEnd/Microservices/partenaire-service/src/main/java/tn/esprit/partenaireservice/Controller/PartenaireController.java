package tn.esprit.partenaireservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.partenaireservice.Entity.Partenaire;
import tn.esprit.partenaireservice.Services.PartenaireService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/partenaires")
public class PartenaireController {

    @Autowired
    private PartenaireService partenaireService;

    // Ajouter un Partenaire
    @PostMapping
    public ResponseEntity<Partenaire> ajouterPartenaire(@RequestBody Partenaire partenaire) {
        Partenaire savedPartenaire = partenaireService.ajouterPartenaire(partenaire);
        return new ResponseEntity<>(savedPartenaire, HttpStatus.CREATED);
    }

    // Obtenir tous les Partenaires
    @GetMapping
    public List<Partenaire> obtenirTousLesPartenaires() {
        return partenaireService.obtenirTousLesPartenaires();
    }

    // Obtenir un Partenaire par ID
    @GetMapping("/{id}")
    public ResponseEntity<Partenaire> obtenirPartenaireParId(@PathVariable Long id) {
        Optional<Partenaire> partenaire = partenaireService.obtenirPartenaireParId(id);
        return partenaire.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Modifier un Partenaire
    @PutMapping("/{id}")
    public ResponseEntity<Partenaire> modifierPartenaire(@PathVariable Long id, @RequestBody Partenaire partenaireDetails) {
        Partenaire updatedPartenaire = partenaireService.modifierPartenaire(id, partenaireDetails);
        return ResponseEntity.ok(updatedPartenaire);
    }

    // Supprimer un Partenaire
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerPartenaire(@PathVariable Long id) {
        partenaireService.supprimerPartenaire(id);
        return ResponseEntity.noContent().build();
    }
}
