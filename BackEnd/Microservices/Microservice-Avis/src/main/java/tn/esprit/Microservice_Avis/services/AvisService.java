package tn.esprit.Microservice_Avis.services;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_Avis.exceptions.ResourceNotFoundException;
import tn.esprit.Microservice_Avis.models.Avis;
import tn.esprit.Microservice_Avis.repository.AvisRepository;
import tn.esprit.Microservice_Avis.requests.AvisRequest;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AvisService {

    private final AvisRepository avisRepository;

    public void saveAvis(Avis avis) {
        avisRepository.save(avis);
    }

    public Avis saveAvis(AvisRequest avis) {

        Avis avisToSave = Avis.builder()
                .commentaire(avis.commentaire())
                .note(avis.note())
                .build();

        return avisRepository.save(avisToSave);
    }

    public List<Avis> getAllAvis() {
        return avisRepository.findAll();
    }

    public Optional<Avis> getAvisById(Long id) {
        return avisRepository.findById(id);
    }

    public void deleteAvis(Long id) {
        avisRepository.deleteById(id);
    }

    public Page<Avis> getPaginatedAvis(Pageable pageable) {
        return avisRepository.findAll(pageable);
    }


    public List<Avis> getAvisByNoteLessThan(Double note) {
        return avisRepository.getAvisByNoteLessThan(note);
    }


    public List<Avis> getAvisByNoteGreaterThan(Double note) {
        return avisRepository.getAvisByNoteGreaterThan(note);
    }

    public List<Avis> getAvisByCommentaireContains(String keyword) {
        return avisRepository.getAvisByCommentaireContains(keyword);
    }

    public Avis updateAvis(Long id, AvisRequest avisRequest) {
        Avis avis = getAvisById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis not found with id: " + id));

        avis.setNote(avisRequest.note());
        avis.setCommentaire(avisRequest.commentaire());

        return avisRepository.save(avis);
    }
}
