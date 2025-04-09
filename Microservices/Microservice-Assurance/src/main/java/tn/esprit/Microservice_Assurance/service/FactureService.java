package tn.esprit.Microservice_Assurance.service;

import tn.esprit.Microservice_Assurance.model.Facture;

import java.util.List;
import java.util.Optional;

public interface FactureService {
    // Créer une nouvelle facture
    Facture createFacture(Facture facture);

    // Créer une facture à partir d'un contrat
    Facture createFactureFromContrat(Long contratId);

    // Récupérer une facture par son ID
    Optional<Facture> getFactureById(Long id);

    // Récupérer toutes les factures
    List<Facture> getAllFactures();

    // Mettre à jour une facture
    Facture updateFacture(Long id, Facture facture);

    // Supprimer une facture
    void deleteFacture(Long id);
}