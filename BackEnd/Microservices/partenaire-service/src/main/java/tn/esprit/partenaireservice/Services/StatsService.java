package tn.esprit.partenaireservice.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.partenaireservice.Repository.ReservationRepository;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatsService {

    @Autowired
    private ReservationRepository reservationRepository;
    public List<String> getAllDistinctInsuranceTypes() {
        return reservationRepository.findAllDistinctOfferTypes()
                .stream()
                .sorted()
                .collect(Collectors.toList());
    }
    public Map<String, Long> getReservationsParTypeOffre() {
        // Récupérer tous les types distincts d'offres
        List<String> allTypes = reservationRepository.findAllDistinctOfferTypes();

        // Récupérer les statistiques
        Map<String, Long> stats = reservationRepository.countReservationsByOffreType().stream()
                .collect(Collectors.toMap(
                        result -> ((String) result[0]).trim(),
                        result -> (Long) result[1],
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        // S'assurer que tous les types sont présents (même avec 0 réservation)
        allTypes.forEach(type -> stats.putIfAbsent(type, 0L));

        return stats;
    }

    public Map<String, Long> getReservationsParMois() {
        Map<String, Long> result = new LinkedHashMap<>();

        // Initialiser tous les mois avec 0
        Arrays.stream(Month.values())
                .forEach(month ->
                        result.put(
                                month.getDisplayName(TextStyle.FULL, Locale.FRENCH),
                                0L
                        )
                );

        // Remplir avec les données réelles
        reservationRepository.countReservationsByMonth().forEach(item -> {
            int monthNum = (Integer) item[0];
            Long count = (Long) item[1];
            Month month = Month.of(monthNum);
            result.put(
                    month.getDisplayName(TextStyle.FULL, Locale.FRENCH),
                    count
            );
        });

        return result;
    }
}