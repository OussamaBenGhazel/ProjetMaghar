package tn.esprit.Microservice_Assurance.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.model.Facture;
import tn.esprit.Microservice_Assurance.model.StatutFacture;
import tn.esprit.Microservice_Assurance.repository.ContratRepository;
import tn.esprit.Microservice_Assurance.repository.FactureRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FactureServiceImpl implements FactureService {

    @Autowired
    private FactureRepository factureRepository;

    @Autowired
    private ContratRepository contratRepository;

    @Override
    public Facture createFacture(Facture facture) {
        return factureRepository.save(facture);
    }

    @Override
    public Facture createFactureFromContrat(Long contratId) {
        // Récupérer le contrat avec l'ID
        Contrat contrat = contratRepository.findById(contratId)
                .orElseThrow(() -> new RuntimeException("Contrat not found with id " + contratId));

        // Créer une nouvelle facture associée au contrat
        Facture facture = new Facture();
        facture.setNumeroFacture(generateFactureNumber());
        facture.setClientId(contrat.getUserId());
        facture.setDateEmission(LocalDate.now());
        facture.setDateEcheance(contrat.getDateFin());
        facture.setMontantTotal(contrat.getMontantAssure());  // Utiliser le montant du contrat
        facture.setStatut(StatutFacture.PENDING);  // Statut initial de la facture
        facture.setCreatedAt(LocalDateTime.now());
        facture.setUpdatedAt(LocalDateTime.now());
        facture.setContrat(contrat);

        // Sauvegarder la facture
        return factureRepository.save(facture);
    }

    @Override
    public Optional<Facture> getFactureById(Long id) {
        return factureRepository.findById(id);
    }

    @Override
    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }

    @Override
    public Facture updateFacture(Long id, Facture facture) {
        if (factureRepository.existsById(id)) {
            facture.setId(id);
            return factureRepository.save(facture);
        } else {
            throw new RuntimeException("Facture not found with id " + id);
        }
    }

    @Override
    public void deleteFacture(Long id) {
        if (factureRepository.existsById(id)) {
            factureRepository.deleteById(id);
        } else {
            throw new RuntimeException("Facture not found with id " + id);
        }
    }

    private String generateFactureNumber() {
        // Vous pouvez utiliser une logique de génération de numéro unique ici.
        return "FAC-" + System.currentTimeMillis();
    }
}
