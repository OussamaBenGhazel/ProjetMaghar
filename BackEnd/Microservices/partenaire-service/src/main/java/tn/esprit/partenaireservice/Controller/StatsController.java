package tn.esprit.partenaireservice.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.partenaireservice.Services.StatsService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/offres-populaires")
    public ResponseEntity<Map<String, Long>> getOffresPopulaires() {
        return ResponseEntity.ok(statsService.getReservationsParTypeOffre());
    }

    @GetMapping("/types-assurance")
    public ResponseEntity<List<String>> getAllInsuranceTypes() {
        return ResponseEntity.ok(statsService.getAllDistinctInsuranceTypes());
    }

    @GetMapping("/reservations-par-mois")
    public ResponseEntity<Map<String, Long>> getReservationsParMois() {
        return ResponseEntity.ok(statsService.getReservationsParMois());
    }
}