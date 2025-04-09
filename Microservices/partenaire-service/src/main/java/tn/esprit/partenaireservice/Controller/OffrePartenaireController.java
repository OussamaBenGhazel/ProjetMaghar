package tn.esprit.partenaireservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.partenaireservice.Entity.OffrePartenaire;
import tn.esprit.partenaireservice.Services.OffrePartenaireService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offres")
public class OffrePartenaireController {

    @Autowired
    private OffrePartenaireService offrePartenaireService;

    // Ajouter une Offre
    @PostMapping
    public ResponseEntity<OffrePartenaire> ajouterOffre(@RequestBody OffrePartenaire offrePartenaire) {
        OffrePartenaire savedOffre = offrePartenaireService.ajouterOffre(offrePartenaire);
        return new ResponseEntity<>(savedOffre, HttpStatus.CREATED);
    }

    // Obtenir toutes les Offres
    @GetMapping
    public List<OffrePartenaire> obtenirToutesLesOffres() {
        return offrePartenaireService.obtenirToutesLesOffres();
    }

    // Obtenir une Offre par ID
    @GetMapping("/{id}")
    public ResponseEntity<OffrePartenaire> obtenirOffreParId(@PathVariable Long id) {
        Optional<OffrePartenaire> offre = offrePartenaireService.obtenirOffreParId(id);
        return offre.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Modifier une Offre
    @PutMapping("/{id}")
    public ResponseEntity<OffrePartenaire> modifierOffre(@PathVariable Long id, @RequestBody OffrePartenaire offreDetails) {
        OffrePartenaire updatedOffre = offrePartenaireService.modifierOffre(id, offreDetails);
        return ResponseEntity.ok(updatedOffre);
    }

    // Supprimer une Offre
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerOffre(@PathVariable Long id) {
        offrePartenaireService.supprimerOffre(id);
        return ResponseEntity.noContent().build();
    }


    // Endpoint pour la recherche d'offres
    @GetMapping("/search")
    public List<OffrePartenaire> rechercherOffres(
            @RequestParam(name = "type", required = false) String typeOffre,
            @RequestParam(name = "prixMax", required = false) Double prixMax,
            @RequestParam(name = "localisation", required = false) String localisation) {

        System.out.println("Contrôleur - Type reçu: " + typeOffre);
        return offrePartenaireService.rechercherOffres(typeOffre, prixMax, localisation);
    }







}