package tn.esprit.Microservice_Reclamation.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.Microservice_Reclamation.Entity.DemandeAssistance;
import tn.esprit.Microservice_Reclamation.Entity.Statut;
import tn.esprit.Microservice_Reclamation.Repository.DemandeAssistanceRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DemandeAssistanceService {

    @Autowired
    private DemandeAssistanceRepository demandeAssistanceRepository;


    public List<DemandeAssistance> getAllDemandes() {
        return demandeAssistanceRepository.findAll();
    }

    public DemandeAssistance getDemandeById(Long id) {
        return demandeAssistanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Demande not found with id: " + id));
    }

    private DemandeAssistance submitDemande(DemandeAssistance demandeAssistance) {

        if (demandeAssistance.getDateRequested() == null) {
            demandeAssistance.setDateRequested(LocalDateTime.now());
        }

        if (demandeAssistance.getStatut() == null) {
            demandeAssistance.setStatut(Statut.EN_ATTENTE);
        }

        return demandeAssistanceRepository.save(demandeAssistance);
    }

    public DemandeAssistance createDemande(DemandeAssistance demandeAssistance) {
        return submitDemande(demandeAssistance);
    }

    @Transactional
    public DemandeAssistance updateDemande(Long id, DemandeAssistance newDemandeAssistance) {
        DemandeAssistance demandeAssistance = demandeAssistanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Demande not found with id: " + id));

        demandeAssistance.setClientName(newDemandeAssistance.getClientName());
        demandeAssistance.setAssistanceType(newDemandeAssistance.getAssistanceType());
        demandeAssistance.setLocation(newDemandeAssistance.getLocation());
        demandeAssistance.setDescription(newDemandeAssistance.getDescription());

        return submitDemande(demandeAssistance);
    }

    public void deleteDemande(Long id) {
        if (!demandeAssistanceRepository.existsById(id)) {
            throw new EntityNotFoundException("Demande not found with id: " + id);
        }
        demandeAssistanceRepository.deleteById(id);
    }

    public DemandeAssistance updateStatut(Long id, Statut newStatut) {
        DemandeAssistance demandeAssistance = demandeAssistanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Demande not found with id: " + id));

        validateStatutTransition(demandeAssistance.getStatut(), newStatut);

        demandeAssistance.setStatut(newStatut);
        return demandeAssistanceRepository.save(demandeAssistance);
    }

    private void validateStatutTransition(Statut currentStatut, Statut newStatut) {
        switch (newStatut) {
            case EN_COURS:
                if (currentStatut != Statut.EN_ATTENTE) {
                    throw new IllegalStateException("Demande must be in 'En attente' to transition to 'En cours'");
                }
                break;
            case TERMINE:
                if (currentStatut != Statut.EN_COURS) {
                    throw new IllegalStateException("Demande must be in 'En cours' to transition to 'Terminé'");
                }
                break;
            default:
                throw new IllegalStateException("Invalid statut transition");
        }
    }
}

