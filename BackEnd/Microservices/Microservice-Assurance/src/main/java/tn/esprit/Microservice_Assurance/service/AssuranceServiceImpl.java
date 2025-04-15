package tn.esprit.Microservice_Assurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_Assurance.model.Assurance;
import tn.esprit.Microservice_Assurance.model.TypeAssurance;
import tn.esprit.Microservice_Assurance.repository.AssuranceRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AssuranceServiceImpl implements AssuranceService {

    private final AssuranceRepository assuranceRepository;

    @Autowired
    public AssuranceServiceImpl(AssuranceRepository assuranceRepository) {
        this.assuranceRepository = assuranceRepository;
    }

    @Override
    public Assurance createAssurance(Assurance assurance) {
        return assuranceRepository.save(assurance);
    }

    @Override
    public Assurance updateAssurance(Long id, Assurance updatedAssurance) {
        // Vérifier si l'assurance existe déjà
        Optional<Assurance> existingAssuranceOpt = assuranceRepository.findById(id);

        if (existingAssuranceOpt.isPresent()) {
            // Récupérer l'assurance existante
            Assurance existingAssurance = existingAssuranceOpt.get();

            // Mettre à jour les propriétés de l'assurance existante avec celles de l'objet 'updatedAssurance'
            existingAssurance.setNom(updatedAssurance.getNom());
            existingAssurance.setDescription(updatedAssurance.getDescription());
            existingAssurance.setCouvertureDetails(updatedAssurance.getCouvertureDetails());
            existingAssurance.setPrime(updatedAssurance.getPrime());
            existingAssurance.setMontantAssure(updatedAssurance.getMontantAssure());
            existingAssurance.setDeductible(updatedAssurance.getDeductible());
            existingAssurance.setType(updatedAssurance.getType());
            existingAssurance.setConditionsGenerales(updatedAssurance.getConditionsGenerales());
            existingAssurance.setDateEffective(updatedAssurance.getDateEffective());
            existingAssurance.setDateExpiration(updatedAssurance.getDateExpiration());
            existingAssurance.setStatut(updatedAssurance.getStatut());
            existingAssurance.setUpdatedAt(LocalDateTime.now());

            // Sauvegarder l'assurance mise à jour dans la base de données
            return assuranceRepository.save(existingAssurance);
        } else {
            // Si l'assurance avec cet ID n'existe pas, retourner null (ou une exception selon ton besoin)
            return null;
        }
    }



    @Override
    public void deleteAssurance(Long id) {
        Assurance assurance = assuranceRepository.findById(id).get();
        assuranceRepository.delete(assurance);
    }

    @Override
    public List<Assurance> getAllAssurances() {
        return assuranceRepository.findAll();
    }

    public Assurance getAssuranceById(Long id) {
        return assuranceRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Assurance with id " + id + " not found"));
    }

    @Override
    public List<Assurance> getAssurancesByType(TypeAssurance type) {
        return assuranceRepository.findByType(type);

    }
}

