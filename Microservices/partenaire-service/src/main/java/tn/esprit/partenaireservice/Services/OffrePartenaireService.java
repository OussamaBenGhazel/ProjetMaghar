package tn.esprit.partenaireservice.Services;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.partenaireservice.Entity.OffrePartenaire;
import tn.esprit.partenaireservice.Repository.OffrePartenaireRepository;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class OffrePartenaireService {

    @Autowired
    private OffrePartenaireRepository offrePartenaireRepository;

    // Ajouter une Offre
    public OffrePartenaire ajouterOffre(OffrePartenaire offrePartenaire) {
        return offrePartenaireRepository.save(offrePartenaire);
    }

    // Obtenir toutes les offres
    public List<OffrePartenaire> obtenirToutesLesOffres() {
        return offrePartenaireRepository.findAll();
    }

    // Obtenir une Offre par ID
    public Optional<OffrePartenaire> obtenirOffreParId(Long id) {
        return offrePartenaireRepository.findById(id);
    }

    // Modifier une Offre
    public OffrePartenaire modifierOffre(Long id, OffrePartenaire offreDetails) {
        OffrePartenaire offrePartenaire = offrePartenaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée avec l'id : " + id));
        offrePartenaire.setTypeOffre(offreDetails.getTypeOffre());
        offrePartenaire.setDescription(offreDetails.getDescription());
        offrePartenaire.setPrix(offreDetails.getPrix());
        offrePartenaire.setPartenaire(offreDetails.getPartenaire());
        return offrePartenaireRepository.save(offrePartenaire);
    }

    // Supprimer une Offre
    public void supprimerOffre(Long id) {
        OffrePartenaire offrePartenaire = offrePartenaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offre non trouvée avec l'id : " + id));
        offrePartenaireRepository.delete(offrePartenaire);
    }



    // Recherche d'offres par type, prix et éventuellement par localisation
    public List<OffrePartenaire> rechercherOffres(String typeOffre, Double prixMax, String localisation) {
        // Normalisation du paramètre typeOffre (enlever les espaces et mettre en minuscule)
        if (typeOffre != null) {
            typeOffre = typeOffre.trim().toLowerCase();  // Cela assure une recherche insensible à la casse.
        }
        System.out.println("Paramètre reçu : typeOffre = " + typeOffre);

        if (typeOffre != null && prixMax != null && localisation != null) {
            return offrePartenaireRepository.findByTypeOffreAndPrixLessThanAndLocalisation(typeOffre, prixMax, localisation);
        } else if (typeOffre != null && prixMax != null) {
            return offrePartenaireRepository.findByTypeOffreAndPrixLessThan(typeOffre, prixMax);
        } else if (typeOffre != null && localisation != null) {
            return offrePartenaireRepository.findByTypeOffreAndLocalisation(typeOffre, localisation);
        } else if (typeOffre != null) {
            return offrePartenaireRepository.findByTypeOffre(typeOffre);
        } else if (prixMax != null && localisation != null) {
            return offrePartenaireRepository.findByPrixLessThanAndLocalisation(prixMax, localisation);
        } else {
            return offrePartenaireRepository.findAll();  // Retourne toutes les offres si aucun paramètre n'est passé
        }
    }






}

