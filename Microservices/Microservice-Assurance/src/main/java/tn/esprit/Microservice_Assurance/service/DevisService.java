package tn.esprit.Microservice_Assurance.service;

import tn.esprit.Microservice_Assurance.model.Devis;

import java.util.List;

public interface DevisService {
    Devis createDevis(Devis devis);
    Devis updateDevis(Long id, Devis devis);
    void deleteDevis(Long id);
    List<Devis> getAllDevis();
    Devis getDevisById(Long id);
}
