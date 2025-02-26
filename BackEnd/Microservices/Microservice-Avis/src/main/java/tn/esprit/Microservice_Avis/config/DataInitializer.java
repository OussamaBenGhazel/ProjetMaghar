package tn.esprit.Microservice_Avis.config;

import lombok.extern.slf4j.Slf4j;
import tn.esprit.Microservice_Avis.models.Avis;
import tn.esprit.Microservice_Avis.services.AvisService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(AvisService avisService) {
        return args -> {
            // Creating and saving Avis instances using the Builder pattern
            Avis avis1 = Avis.builder()
                    .note(4.5)
                    .commentaire("Great service! Highly recommended.")
                    .build();

            Avis avis2 = Avis.builder()
                    .note(3.0)
                    .commentaire("Good, but could be improved.")
                    .build();

            Avis avis3 = Avis.builder()
                    .note(5.0)
                    .commentaire("Excellent experience! Will come back again.")
                    .build();

            Avis avis4 = Avis.builder()
                    .note(2.5)
                    .commentaire("Average service, needs improvement.")
                    .build();

            Avis avis5 = Avis.builder()
                    .note(4.0)
                    .commentaire("Very satisfied with the service.")
                    .build();

            Avis avis6 = Avis.builder()
                    .note(1.5)
                    .commentaire("Not happy with the experience.")
                    .build();

            Avis avis7 = Avis.builder()
                    .note(5.0)
                    .commentaire("Outstanding! Exceeded my expectations.")
                    .build();

            Avis avis8 = Avis.builder()
                    .note(3.5)
                    .commentaire("Pretty decent, will consider again.")
                    .build();

            Avis avis9 = Avis.builder()
                    .note(4.8)
                    .commentaire("Almost perfect! Loved it.")
                    .build();

            Avis avis10 = Avis.builder()
                    .note(2.0)
                    .commentaire("Not the best experience, needs work.")
                    .build();

            // Persisting the entities
            avisService.saveAvis(avis1);
            avisService.saveAvis(avis2);
            avisService.saveAvis(avis3);
            avisService.saveAvis(avis4);
            avisService.saveAvis(avis5);
            avisService.saveAvis(avis6);
            avisService.saveAvis(avis7);
            avisService.saveAvis(avis8);
            avisService.saveAvis(avis9);
            avisService.saveAvis(avis10);

            log.info("Data inserted into the database.");
        };
    }

}

