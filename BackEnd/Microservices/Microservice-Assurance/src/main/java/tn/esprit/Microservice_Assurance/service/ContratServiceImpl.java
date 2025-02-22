package tn.esprit.Microservice_Assurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_Assurance.feign.UserDTO;
import tn.esprit.Microservice_Assurance.feign.UserFeignClient;
import tn.esprit.Microservice_Assurance.model.Assurance;
import tn.esprit.Microservice_Assurance.model.Contrat;
import tn.esprit.Microservice_Assurance.repository.AssuranceRepository;
import tn.esprit.Microservice_Assurance.repository.ContratRepository;

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
    private UserFeignClient userFeignClient;  // Injection du Feign Client pour accéder aux utilisateurs

    @Override
    public Contrat createContrat(Contrat contrat) {
        contrat.setCreatedAt(LocalDateTime.now());
        contrat.setUpdatedAt(LocalDateTime.now());
        return contratRepository.save(contrat);
    }

    @Override
    public Contrat updateContrat(Long id, Contrat contrat) {
        if (contratRepository.existsById(id)) {
            contrat.setId(id);
            contrat.setUpdatedAt(LocalDateTime.now());
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

    /**
     * Créer un contrat pour un utilisateur à partir d'une assurance.
     */
    @Override
    public Contrat createContratFromAssurance(Long assuranceId, Long userId, Contrat contrat) {
        // Utilisation du Feign Client pour récupérer les informations sur l'utilisateur
        UserDTO user = userFeignClient.getUserById(userId);  // Appel au microservice User

        // Vérifier si l'utilisateur existe
        if (user == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé");
        }

        // Récupérer l'assurance à partir de l'ID
        Assurance assurance = assuranceRepository.findById(assuranceId)
                .orElseThrow(() -> new IllegalArgumentException("Assurance non trouvée"));

        // Associer l'assurance et l'utilisateur au contrat
        contrat.setAssurance(assurance);
        contrat.setUserId(userId);  // Associer l'utilisateur au contrat
        contrat.setCreatedAt(LocalDateTime.now());
        contrat.setUpdatedAt(LocalDateTime.now());

        // Définir les valeurs par défaut basées sur l'assurance
        contrat.setPrime(assurance.getPrime());
        contrat.setMontantAssure(assurance.getMontantAssure());

        // Sauvegarder le contrat
        return contratRepository.save(contrat);
    }

    /**
     * Affecter un contrat à un utilisateur existant.
     */
    @Override
    public Contrat affecterContratAUtilisateur(Long contratId, Long userId) {
        // Utilisation du Feign Client pour récupérer les informations sur l'utilisateur
        UserDTO user = userFeignClient.getUserById(userId);  // Appel au microservice User

        // Vérifier si l'utilisateur existe
        if (user == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé");
        }

        // Trouver le contrat à partir de l'ID
        Contrat contrat = contratRepository.findById(contratId)
                .orElseThrow(() -> new IllegalArgumentException("Contrat non trouvé"));

        // Assigner l'utilisateur au contrat
        contrat.setUserId(userId);
        contrat.setUpdatedAt(LocalDateTime.now());

        // Sauvegarder le contrat mis à jour
        return contratRepository.save(contrat);
    }

    /**
     * Signer un contrat en stockant une signature (Base64).
     */
    public Contrat signerContrat(Long idContrat, String signatureBase64) {
        Contrat contrat = contratRepository.findById(idContrat)
                .orElseThrow(() -> new RuntimeException("Contrat non trouvé"));

        // Ajouter la signature au contrat
        contrat.setSignature(signatureBase64);
        contrat.setUpdatedAt(LocalDateTime.now());

        // Sauvegarder le contrat signé
        return contratRepository.save(contrat);
    }
}
