package tn.esprit.Microservice_Assurance.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_Assurance.model.Assurance;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.model.Devis;
import tn.esprit.Microservice_Assurance.repository.AssuranceRepository;
import tn.esprit.Microservice_Assurance.repository.ContratRepository;
import tn.esprit.Microservice_Assurance.repository.DevisRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContratServiceImpl implements ContratService {

    @Autowired
    private ContratRepository contratRepository;

    @Autowired
    private AssuranceRepository assuranceRepository;


    @Autowired
    private DevisRepository devisRepository;


    @Override
    public Contrat createContrat(Contrat contrat) {
        return contratRepository.save(contrat);
    }

    @Override
    public Contrat updateContrat(Long id, Contrat contrat) {
        if (contratRepository.existsById(id)) {
            contrat.setId(id);
            return contratRepository.save(contrat);
        }
        throw new RuntimeException("Contrat not found with id " + id);
    }

    @Override
    public void deleteContrat(Long id) {
        contratRepository.deleteById(id);
    }

    @Override
    public List<Contrat> getAllContrats() {
        return contratRepository.findAll();
    }

    @Override
    public Optional<Contrat> getContratById(Long id) {
        return contratRepository.findById(id);
    }

    @Override
    public Contrat createContratFromAssurance(Long assuranceId, Contrat contrat) {
        Assurance assurance = assuranceRepository.findById(assuranceId).orElseThrow(() -> new IllegalArgumentException("Assurance non trouvée"));

        contrat.setAssurance(assurance);
        contrat.setCreatedAt(LocalDateTime.now());
        contrat.setUpdatedAt(LocalDateTime.now());

        // On peut aussi ajouter des valeurs par défaut ou spécifiques selon l'assurance
        contrat.setPrime(assurance.getPrime());  // Exemple
        contrat.setMontantAssure(assurance.getMontantAssure());  // Exemple

        return contratRepository.save(contrat);
    }


    @Override
    public Contrat createContratFromDevis(Long devisId, Contrat contrat) {
        Devis devis = devisRepository.findById(devisId).orElseThrow(() -> new IllegalArgumentException("Devis non trouvé"));

        contrat.setDevis(devis);
        contrat.setCreatedAt(LocalDateTime.now());
        contrat.setUpdatedAt(LocalDateTime.now());

        // On peut aussi ajouter des valeurs par défaut ou spécifiques selon le devis
        contrat.setPrime(devis.getPrimeEstimee());  // Exemple
        contrat.setMontantAssure(devis.getMontantAssureTotal());  // Exemple

        return contratRepository.save(contrat);
    }



}
