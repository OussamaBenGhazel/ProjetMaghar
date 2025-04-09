package tn.esprit.Microservice_Rendezvous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@EnableScheduling
public class RappelScheduler {

    @Autowired
    private RendezVousRepository rendezVousRepository;

    @Autowired
    private NotificationService notificationService;

    @Scheduled(fixedRate = 60000) // 60000 ms = 1 minute
    public void envoyerRappels() {
        System.out.println("Vérification des rappels à envoyer...");
        LocalDateTime maintenant = LocalDateTime.now();
        LocalDateTime dans1Minute = maintenant.plus(1, ChronoUnit.MINUTES);
        LocalDateTime dans2Minutes = maintenant.plus(2, ChronoUnit.MINUTES);

        System.out.println("Recherche des rendez-vous entre " + dans1Minute + " et " + dans2Minutes);
        List<RendezVous> rendezVousAComing = rendezVousRepository.findByDateHeureBetweenAndRappelEnvoyeFalse(dans1Minute, dans2Minutes);

        System.out.println("Nombre de rendez-vous trouvés : " + rendezVousAComing.size());
        for (RendezVous rendezVous : rendezVousAComing) {
            System.out.println("Envoi d'un rappel par SMS pour le rendez-vous ID " + rendezVous.getId() + " à " + rendezVous.getNumeroTelephoneClient());
            try {
                notificationService.envoyerRappelParSMS(rendezVous);
                rendezVous.setRappelEnvoye(true);
                rendezVousRepository.save(rendezVous);
                System.out.println("Rappel marqué comme envoyé pour le rendez-vous ID " + rendezVous.getId());
            } catch (Exception e) {
                System.err.println("Échec de l'envoi du rappel par SMS pour le rendez-vous ID " + rendezVous.getId() + " : " + e.getMessage());
            }
        }
    }
}