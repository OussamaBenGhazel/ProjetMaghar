package tn.esprit.Microservice_Recrutement;

import org.springframework.web.bind.annotation.*;

@RestController
public class DataDeletionController {

    @PostMapping("/data-deletion-callback")
    public String handleDataDeletionRequest(@RequestBody String payload) {
        // Logique pour gérer la suppression des données (peut être implémentée plus tard)
        System.out.println("Requête de suppression des données reçue : " + payload);
        return "{\"url\": \"https://iketata1.github.io/privacy-policy/\", \"confirmation_code\": \"PROJETMAGHAR-" + System.currentTimeMillis() + "\"}";
    }
}