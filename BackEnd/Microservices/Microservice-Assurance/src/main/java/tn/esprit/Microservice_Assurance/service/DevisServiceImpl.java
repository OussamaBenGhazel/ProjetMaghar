package tn.esprit.Microservice_Assurance.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_Assurance.model.Devis;
import tn.esprit.Microservice_Assurance.repository.DevisRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DevisServiceImpl implements DevisService {

    private final DevisRepository devisRepository;

    @Autowired
    public DevisServiceImpl(DevisRepository devisRepository) {
        this.devisRepository = devisRepository;
    }

    @Override
    public Devis createDevis(Devis devis) {
        // Assurez-vous que la date de création est définie automatiquement
        devis.setCreatedAt(LocalDateTime.now());
        devis.setUpdatedAt(LocalDateTime.now());
        return devisRepository.save(devis);
    }

    @Override
    public Devis updateDevis(Long id, Devis devisDetails) {
        Devis devis = devisRepository.findById(id).get();

        devis.setNumeroDevis(devisDetails.getNumeroDevis());
        devis.setClientId(devisDetails.getClientId());
        devis.setPrimeEstimee(devisDetails.getPrimeEstimee());
        devis.setMontantAssureTotal(devisDetails.getMontantAssureTotal());
        devis.setDateValidite(devisDetails.getDateValidite());
        devis.setStatut(devisDetails.getStatut());
        devis.setUpdatedAt(LocalDateTime.now());

        return devisRepository.save(devis);
    }

    @Override
    public void deleteDevis(Long id) {
        Devis devis = devisRepository.findById(id).get();
        devisRepository.delete(devis);
    }

    @Override
    public List<Devis> getAllDevis() {
        return devisRepository.findAll();
    }

    @Override
    public Devis getDevisById(Long id) {
        return devisRepository.findById(id).get();
    }
}
