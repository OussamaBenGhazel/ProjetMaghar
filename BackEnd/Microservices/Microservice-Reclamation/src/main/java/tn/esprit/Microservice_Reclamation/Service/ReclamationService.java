package tn.esprit.Microservice_Reclamation.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.Microservice_Reclamation.Entity.Reclamation;
import tn.esprit.Microservice_Reclamation.Entity.Statut;
import tn.esprit.Microservice_Reclamation.Repository.ReclamationRepository;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;


    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }


    public Reclamation getReclamationById(Long id) {
        return reclamationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reclamation not found with id: " + id));
    }


    private Reclamation submitReclamation(Reclamation reclamation) {

        if (reclamation.getDateCreation() == null) {
            reclamation.setDateCreation(LocalDate.now());
        }

        if (reclamation.getStatut() == null) {
            reclamation.setStatut(Statut.EN_ATTENTE);
        }

        return reclamationRepository.save(reclamation);
    }

    public Reclamation createReclamation(Reclamation reclamation) {
        return submitReclamation(reclamation);
    }

    @Transactional
    public Reclamation updateReclamation(Long id, Reclamation newReclamation) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reclamation not found with id: " + id));


        reclamation.setClientName(newReclamation.getClientName());
        reclamation.setTypeReclamation(newReclamation.getTypeReclamation());
        reclamation.setTitre(newReclamation.getTitre());
        reclamation.setDescription(newReclamation.getDescription());

        return submitReclamation(reclamation);
    }

    public void deleteReclamation(Long id) {
        if (!reclamationRepository.existsById(id)) {
            throw new EntityNotFoundException("Reclamation not found with id: " + id);
        }
        reclamationRepository.deleteById(id);
    }

    public Reclamation updateStatut(Long id, Statut newStatut) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reclamation not found with id: " + id));


        validateStatusTransition(reclamation.getStatut(), newStatut);

        reclamation.setStatut(newStatut);
        return reclamationRepository.save(reclamation);
    }


    private void validateStatusTransition(Statut currentStatut, Statut newStatut) {
        switch (newStatut) {
            case EN_COURS:
                if (currentStatut != Statut.EN_ATTENTE) {
                    throw new IllegalStateException("Reclamation must be in 'En attente' to transition to 'En cours'");
                }
                break;
            case TERMINE:
                if (currentStatut != Statut.EN_COURS) {
                    throw new IllegalStateException("Reclamation must be in 'En cours' to transition to 'Terminé'");
                }
                break;
            default:
                throw new IllegalStateException("Invalid status transition");
        }
    }
}
