package tn.esprit.partenaireservice.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.partenaireservice.Entity.Partenaire;
import tn.esprit.partenaireservice.Repository.PartenaireRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PartenaireService {

    @Autowired
    private PartenaireRepository partenaireRepository;

    // Ajouter un Partenaire
    public Partenaire ajouterPartenaire(Partenaire partenaire) {
        return partenaireRepository.save(partenaire);
    }

    // Obtenir tous les Partenaires
    public List<Partenaire> obtenirTousLesPartenaires() {
        return partenaireRepository.findAll();
    }

    // Obtenir un Partenaire par ID
    public Optional<Partenaire> obtenirPartenaireParId(Long id) {
        return partenaireRepository.findById(id);
    }

    // Modifier un Partenaire
    public Partenaire modifierPartenaire(Long id, Partenaire partenaireDetails) {
        Partenaire partenaire = partenaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partenaire non trouvé avec l'id : " + id));
        partenaire.setNom(partenaireDetails.getNom());
        partenaire.setType(partenaireDetails.getType());
        partenaire.setAdresse(partenaireDetails.getAdresse());
        partenaire.setTelephone(partenaireDetails.getTelephone());
        partenaire.setLatitude(partenaireDetails.getLatitude());
        partenaire.setLongitude(partenaireDetails.getLongitude());
        return partenaireRepository.save(partenaire);
    }

    // Supprimer un Partenaire
    public void supprimerPartenaire(Long id) {
        Partenaire partenaire = partenaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partenaire non trouvé avec l'id : " + id));
        partenaireRepository.delete(partenaire);
    }
}

