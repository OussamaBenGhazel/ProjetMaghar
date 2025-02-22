package tn.esprit.Microservice_Assurance.service;

import tn.esprit.Microservice_Assurance.model.Contrat;

import java.util.List;
import java.util.Optional;

public interface ContratService {
    Contrat createContrat(Contrat contrat);
    Contrat updateContrat(Long id, Contrat contrat);
    void deleteContrat(Long id);
    List<Contrat> getAllContrats();
    Optional<Contrat> getContratById(Long id);

    Contrat createContratFromAssurance(Long assuranceId, Long userId, Contrat contrat);
    Contrat affecterContratAUtilisateur(Long contratId, Long userId);
    Contrat signerContrat(Long idContrat, String signatureBase64);
}
