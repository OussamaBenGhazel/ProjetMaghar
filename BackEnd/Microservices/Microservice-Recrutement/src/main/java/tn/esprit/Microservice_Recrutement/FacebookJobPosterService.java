package tn.esprit.Microservice_Recrutement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FacebookJobPosterService {
    private final RestTemplate restTemplate;
    private final OffreEmploiRepository offreEmploiRepository;
    private String pageAccessToken; // Token chargé dynamiquement
    private static final String PAGE_ID = "657409357449071"; // ID de la page "Offres d’Emploi"
    private static final String FB_API_URL = "https://graph.facebook.com/v12.0/" + PAGE_ID + "/feed";
    private static final String LONG_LIVED_USER_TOKEN = "EAA4Oa2RQ11oBO8ERZCibhMOU5ZBK1ZBqAKGLS0BIcvcKVXu5xwSgZAHNSLnBNKmuY5Dm4RKwl4DCUdOG6epIHi4hZAzFRp9zYZAeWmYbCE3EjkpJzugYyHGDoRE9N6ZAnUjqUrcsyl5auBz2ZAR0qZBjUkABWbBw10cjzShZCKsZCJOmz3KGwmZANLGNUSIO"; // Long-Lived User Access Token
    private static final String APP_ID = "3956504081258330"; // Identifiant de l’application
    private static final String APP_SECRET = "8a06101ae21a9a1c19d1337efa37c4df"; // Clé secrète

    @Autowired
    public FacebookJobPosterService(RestTemplate restTemplate, OffreEmploiRepository offreEmploiRepository) {
        this.restTemplate = restTemplate;
        this.offreEmploiRepository = offreEmploiRepository;
        this.pageAccessToken = "EAA4Oa2RQ11oBO7I0U7KB3H2sr1Ytbu64zAqaSZA7K9ocNGe7OuGHczBTeRWZAESqaGfB0fYWEAl8EaLIcCgKjFxvdlvG2sko0MZC2Jdunx6hjuNLR2yKrQkCcZB9y7oxZBEz6NE0abhVzzgy9UDgZCfwH0nAvWTFGNZBtZC4qKeYPtQfdXTvU6zOZCyYnSV7WPfwL"; // Page Access Token pour "Offres d’Emploi"
    }

    @PostConstruct
    public void init() {
        refreshPageAccessToken(); // Rafraîchir le token après l'initialisation du bean
    }

    @Scheduled(fixedRate = 60000) // Vérifie toutes les minutes
    public void publishScheduledJobs() {
        LocalDate now = LocalDate.now();
        System.out.println("Vérification des offres à publier à : " + now);
        List<OffreEmploi> offresToPublish = offreEmploiRepository.findByDatePublicationLessThanEqualAndIsPublishedFalse(now);

        if (offresToPublish.isEmpty()) {
            System.out.println("Aucune offre à publier pour le moment.");
            return;
        }

        for (OffreEmploi offre : offresToPublish) {
            System.out.println("Publication de l’offre : " + offre.getTitre());
            String message = "Nouvelle offre d’emploi : " + offre.getTitre() + "\n" +
                    "Description : " + offre.getDescription() + "\n" +
                    "Catégorie : " + offre.getCategorie() + "\n" +
                    "Localisation : " + offre.getLocalisation() + "\n" +
                    "Type de contrat : " + offre.getTypeContrat() + "\n" +
                    "Salaire : " + (offre.getSalaireMin() != null ? offre.getSalaireMin() : "N/A") + " - " +
                    (offre.getSalaireMax() != null ? offre.getSalaireMax() : "N/A") + "\n" +
                    "Niveau d’expérience : " + offre.getNiveauExperience() + "\n" +
                    "Compétences requises : " + offre.getCompetencesRequises() + "\n" +
                    "Date d’expiration : " + offre.getDateExpiration() + "\n" +
                    "Postulez dès maintenant !";
            publishToFacebook(message);
            offre.setIsPublished(true);
            offreEmploiRepository.save(offre);
            System.out.println("Offre marquée comme publiée : " + offre.getTitre());
        }
    }

    @Scheduled(cron = "0 0 0 * * ?") // Vérifie tous les jours à minuit
    public void refreshPageAccessToken() {
        String url = "https://graph.facebook.com/v12.0/me/accounts?access_token=" + LONG_LIVED_USER_TOKEN;
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> body = response.getBody();
            if (body != null && body.containsKey("data")) {
                List<Map<String, Object>> pages = (List<Map<String, Object>>) body.get("data");
                for (Map<String, Object> page : pages) {
                    if (PAGE_ID.equals(page.get("id"))) {
                        this.pageAccessToken = (String) page.get("access_token");
                        System.out.println("Nouveau Page Access Token généré : " + this.pageAccessToken);
                        break;
                    }
                }
            } else {
                System.err.println("Erreur lors du rafraîchissement du token : " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Erreur lors du rafraîchissement du token : " + e.getMessage());
        }
    }

    private void publishToFacebook(String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("message", message);
        body.put("access_token", pageAccessToken);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(FB_API_URL, request, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Offre publiée sur Facebook : " + response.getBody());
            } else {
                System.err.println("Erreur lors de la publication : " + response.getStatusCode() + " - " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Erreur Facebook : " + e.getMessage());
        }
    }
}