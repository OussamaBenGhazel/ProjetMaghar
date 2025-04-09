package tn.esprit.Microservice_Rendezvous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RendezVousService {

    @Autowired
    private RendezVousRepository rendezVousRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Transactional
    public RendezVous creerRendezVous(RendezVous rendezVous) {
        // Validation des champs obligatoires
        if (rendezVous.getDateHeure() == null || rendezVous.getDateHeure().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La date et l'heure du rendez-vous doivent être dans le futur.");
        }
        if (rendezVous.getNomClient() == null || rendezVous.getNomClient().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom du client est obligatoire.");
        }
        if (rendezVous.getEmailClient() == null || !rendezVous.getEmailClient().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("L'email du client est invalide.");
        }

        // Assignation automatique de l'agent si non spécifié
        if (rendezVous.getAgentAssurance() == null || rendezVous.getAgentAssurance().getId() == null) {
            AgentAssurance agent = agentRepository.findFirstByOrderByIdAsc();
            if (agent == null) {
                throw new IllegalStateException("Aucun agent disponible pour prendre un rendez-vous.");
            }
            rendezVous.setAgentAssurance(agent);
        }

        // Vérifier les conflits de rendez-vous pour l'agent
        List<RendezVous> conflits = rendezVousRepository.findByAgentAssuranceIdAndDateHeure(
                rendezVous.getAgentAssurance().getId(), rendezVous.getDateHeure());
        if (!conflits.isEmpty()) {
            throw new IllegalStateException("L'agent est déjà occupé à cette date et heure.");
        }

        // Définir le statut par défaut
        rendezVous.setStatut("En attente");
        return rendezVousRepository.save(rendezVous);
    }

    public Optional<RendezVous> getRendezVousById(Long id) {
        return rendezVousRepository.findById(id);
    }

    public List<RendezVous> getRendezVousByAgentId(Long agentId) {
        return rendezVousRepository.findByAgentAssurance_Id(agentId);
    }

    @Transactional
    public RendezVous updateRendezVous(Long id, RendezVous rendezVousDetails) {
        return rendezVousRepository.findById(id).map(rendezVous -> {
            rendezVous.setDateHeure(rendezVousDetails.getDateHeure());
            rendezVous.setStatut(rendezVousDetails.getStatut());
            rendezVous.setNomClient(rendezVousDetails.getNomClient());
            rendezVous.setEmailClient(rendezVousDetails.getEmailClient());
            rendezVous.setNumeroTelephoneClient(rendezVousDetails.getNumeroTelephoneClient());

            if (rendezVousDetails.getAgentAssurance() != null) {
                rendezVous.setAgentAssurance(rendezVousDetails.getAgentAssurance());
            }
            List<RendezVous> conflits = rendezVousRepository.findByAgentAssuranceIdAndDateHeure(
                    rendezVous.getAgentAssurance().getId(), rendezVous.getDateHeure());
            if (conflits.stream().anyMatch(r -> !r.getId().equals(id))) {
                throw new IllegalStateException("L'agent est déjà occupé à cette date et heure.");
            }

            return rendezVousRepository.save(rendezVous);
        }).orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé avec l'ID : " + id));
    }

    @Transactional
    public void deleteRendezVous(Long id) {
        if (!rendezVousRepository.existsById(id)) {
            throw new RuntimeException("Rendez-vous non trouvé avec l'ID : " + id);
        }
        rendezVousRepository.deleteById(id);
    }
}