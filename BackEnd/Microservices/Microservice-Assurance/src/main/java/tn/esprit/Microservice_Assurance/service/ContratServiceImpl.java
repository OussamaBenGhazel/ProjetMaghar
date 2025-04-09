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
    private UserFeignClient userFeignClient;

    @Override
    public Contrat createContrat(Contrat contrat) {
        contrat.setCreatedAt(LocalDateTime.now());
        contrat.setUpdatedAt(LocalDateTime.now());
        return contratRepository.save(contrat);
    }

    @Override
    public Contrat updateContrat(Long id, Contrat contrat) {
        Contrat existingContrat = contratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contrat not found with id " + id));

        // Mettre à jour les champs avec les nouvelles valeurs, si présentes
        if (contrat.getNumeroContrat() != null) existingContrat.setNumeroContrat(contrat.getNumeroContrat());
        if (contrat.getDateDebut() != null) existingContrat.setDateDebut(contrat.getDateDebut());
        if (contrat.getDateFin() != null) existingContrat.setDateFin(contrat.getDateFin());
        if (contrat.getPrime() != null) existingContrat.setPrime(contrat.getPrime());
        if (contrat.getMontantAssure() != null) existingContrat.setMontantAssure(contrat.getMontantAssure());
        if (contrat.getStatut() != null) existingContrat.setStatut(contrat.getStatut());
        if (contrat.getSignature() != null) existingContrat.setSignature(contrat.getSignature()); // Ajout de la mise à jour pour signature
        if (contrat.getAssurance() != null && contrat.getAssurance().getId() != null) {
            Assurance assurance = assuranceRepository.findById(contrat.getAssurance().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Assurance non trouvée"));
            existingContrat.setAssurance(assurance);
        }
        existingContrat.setUpdatedAt(LocalDateTime.now());

        System.out.println("📌 Contrat mis à jour avant sauvegarde : " + existingContrat); // Log pour débogage
        return contratRepository.save(existingContrat);
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
    public Contrat createContratFromAssurance(Long assuranceId, Long userId, Contrat contrat) {
        UserDTO user = userFeignClient.getUserById(userId);
        if (user == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé");
        }

        Assurance assurance = assuranceRepository.findById(assuranceId)
                .orElseThrow(() -> new IllegalArgumentException("Assurance non trouvée"));

        contrat.setAssurance(assurance);
        contrat.setUserId(userId);
        contrat.setCreatedAt(LocalDateTime.now());
        contrat.setUpdatedAt(LocalDateTime.now());
        contrat.setPrime(assurance.getPrime());
        contrat.setMontantAssure(assurance.getMontantAssure());

        return contratRepository.save(contrat);
    }

    @Override
    public Contrat affecterContratAUtilisateur(Long contratId, Long userId) {
        UserDTO user = userFeignClient.getUserById(userId);
        if (user == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé");
        }

        Contrat contrat = contratRepository.findById(contratId)
                .orElseThrow(() -> new IllegalArgumentException("Contrat non trouvé"));

        contrat.setUserId(userId);
        contrat.setUpdatedAt(LocalDateTime.now());

        return contratRepository.save(contrat);
    }

    @Override
    public Contrat signerContrat(Long idContrat, String signatureBase64) {
        if (signatureBase64 == null || signatureBase64.isEmpty()) {
            throw new IllegalArgumentException("Signature invalide");
        }

        Contrat contrat = contratRepository.findById(idContrat)
                .orElseThrow(() -> new RuntimeException("Contrat non trouvé"));

        contrat.setSignature(signatureBase64);
        contrat.setUpdatedAt(LocalDateTime.now());

        return contratRepository.save(contrat);
    }
}