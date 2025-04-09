package tn.esprit.partenaireservice.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.partenaireservice.Entity.OffrePartenaire;
import tn.esprit.partenaireservice.Repository.OffrePartenaireRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/advice")
public class AdviceController {

    private final OffrePartenaireRepository offrePartenaireRepository;

    public AdviceController(OffrePartenaireRepository offrePartenaireRepository) {
        this.offrePartenaireRepository = offrePartenaireRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAdvice(
            @RequestParam("lat") double latitude,
            @RequestParam("lng") double longitude,
            @RequestParam("type") String insuranceType) {

        try {
            List<OffrePartenaire> offres = offrePartenaireRepository.findByLocalisationAndType(
                    insuranceType, latitude, longitude);

            if (offres.isEmpty()) {
                return ResponseEntity.ok("❌ Aucune offre disponible pour cette localisation et ce type.");
            }

            StringBuilder advice = new StringBuilder();
            String riskStatus = isHighRiskZone(latitude, longitude) ? "⚠️ Zone à risque" : "✅ Zone sécurisée";

            advice.append("<div class='advice-header'>")
                    .append("<h3>").append(riskStatus).append("</h3>")
                    .append("<p>Nos recommandations pour vous :</p>")
                    .append("</div>");

            // Conseils généraux
            advice.append("<div class='general-advice'>");
            if (isHighRiskZone(latitude, longitude)) {
                advice.append("<ul>")
                        .append("<li>Vérifiez les exclusions de garantie spécifiques</li>")
                        .append("<li>Optez pour une couverture étendue</li>")
                        .append("<li>Consultez les avis locaux</li>")
                        .append("</ul>");
            } else {
                advice.append("<ul>")
                        .append("<li>Profitez des tarifs avantageux</li>")
                        .append("<li>Comparez les garanties incluses</li>")
                        .append("</ul>");
            }
            advice.append("</div>");

            // Conseils spécifiques au type
            advice.append("<div class='specific-advice'>")
                    .append("<h4>Conseils ").append(insuranceType).append("</h4>")
                    .append("<p>").append(getTypeSpecificAdvice(insuranceType)).append("</p>")
                    .append("</div>");

            // Offres disponibles
            advice.append("<div class='offers-list'>")
                    .append("<h4>Meilleures offres :</h4>")
                    .append("<ul>");

            offres.stream()
                    .limit(3)
                    .forEach(offre -> advice.append("<li>")
                            .append("<strong>").append(offre.getTypeOffre()).append("</strong> - ")
                            .append(offre.getDescription())
                            .append(" (").append(offre.getPrix()).append("€)")
                            .append("</li>"));

            advice.append("</ul></div>");

            return ResponseEntity.ok(advice.toString());

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("🚨 Désolé, notre assistant n'a pas pu récupérer les conseils. Veuillez réessayer.");
        }
    }

    private boolean isHighRiskZone(double latitude, double longitude) {
        final double RISK_LAT_THRESHOLD = 36.8;
        final double RISK_LNG_THRESHOLD = 10.1;
        return latitude > RISK_LAT_THRESHOLD && longitude > RISK_LNG_THRESHOLD;
    }

    private String getTypeSpecificAdvice(String insuranceType) {
        switch(insuranceType.toLowerCase()) {
            case "assurance habitation":
                return "Vérifiez les garanties contre les catastrophes naturelles et les dégâts des eaux.";
            case "assurance santé":
                return "Comparez les taux de remboursement pour vos soins courants et les délais de carence.";
            case "assurance voyage":
                return "Assurez-vous que la couverture inclut l'assistance rapatriement et les activités sportives.";
            case "assurance scolaire":
                return "Vérifiez les garanties extrascolaires et les activités couvertes.";
            default:
                return "Comparez attentivement les garanties et les prix avant de choisir.";
        }
    }
}