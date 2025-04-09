package tn.esprit.Microservice_Rendezvous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/rendezvous")
public class RendezVousController {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private RendezVousService rendezVousService;
    @PostMapping
    public ResponseEntity<?> creerRendezVous(@RequestBody RendezVous rendezVous) {
        try {
            RendezVous savedRendezVous = rendezVousService.creerRendezVous(rendezVous);
            return new ResponseEntity<>(savedRendezVous, HttpStatus.CREATED);
        } catch (IllegalArgumentException | IllegalStateException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Erreur interne du serveur : " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/test-sms")
    public ResponseEntity<String> testSMS(@RequestBody RendezVous rendezVous) {
        try {
            notificationService.envoyerRappelParSMS(rendezVous);
            return new ResponseEntity<>("SMS envoyé avec succès", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de l'envoi du SMS : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<RendezVous> getRendezVousById(@PathVariable Long id) {
        Optional<RendezVous> rendezVous = rendezVousService.getRendezVousById(id);
        return rendezVous.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<RendezVous>> getRendezVousByAgentId(@PathVariable Long agentId) {
        List<RendezVous> rendezVousList = rendezVousService.getRendezVousByAgentId(agentId);
        return new ResponseEntity<>(rendezVousList, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezVous> updateRendezVous(@PathVariable Long id, @RequestBody RendezVous rendezVousDetails) {
        try {
            RendezVous updatedRendezVous = rendezVousService.updateRendezVous(id, rendezVousDetails);
            return new ResponseEntity<>(updatedRendezVous, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRendezVous(@PathVariable Long id) {
        try {
            rendezVousService.deleteRendezVous(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}