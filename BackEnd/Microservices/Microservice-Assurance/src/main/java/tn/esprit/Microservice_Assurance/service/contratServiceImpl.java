package tn.esprit.Microservice_Assurance.service;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contrats")
public class ContratController {

    private final ContratServiceImpl ;

    public ContratController(ContratService contratService) {
        this.contratService = contratService;
    }

    // Récupérer tous les contrats
    @GetMapping
    public ResponseEntity<List<Contrat>> getAllContrats() {
        List<Contrat> contrats = contratService.getAllContrats();
        return ResponseEntity.ok(contrats);
    }

    // Récupérer un contrat par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Contrat> getContratById(@PathVariable Long id) {
        Optional<Contrat> contratOpt = contratService.getContratById(id);
        return contratOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Créer un contrat
    // Ici, nous attendons que l'ID de l'utilisateur et le montant soient passés en paramètres
    // et que l'objet Assurance soit fourni dans le corps de la requête.
    @PostMapping
    public ResponseEntity<Contrat> createContrat(@RequestParam Long userId,
                                                 @RequestParam Double montant,
                                                 @RequestBody Assurance assurance) {
        Contrat contrat = contratService.createContrat(userId, assurance, montant);
        return ResponseEntity.ok(contrat);
    }

    // Récupérer les contrats d'un utilisateur spécifique
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Contrat>> getContratsByUserId(@PathVariable Long userId) {
        List<Contrat> contrats = contratService.getContratsByUserId(userId);
        return ResponseEntity.ok(contrats);
    }

    // Supprimer un contrat par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContrat(@PathVariable Long id) {
        contratService.deleteContrat(id);
        return ResponseEntity.noContent().build();
    }
}