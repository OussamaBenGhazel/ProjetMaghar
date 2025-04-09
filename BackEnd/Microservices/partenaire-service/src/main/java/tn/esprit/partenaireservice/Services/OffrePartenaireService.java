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


    public List<OffrePartenaire> filtrerOffres(String typeAssurance, Double prixMax, String localisation) {
        List<OffrePartenaire> offres = offrePartenaireRepository.findByTypeOffre(typeAssurance);

        if (prixMax != null) {
            offres = offres.stream().filter(o -> o.getPrix() <= prixMax).toList();
        }

        if (localisation != null && !localisation.isEmpty()) {
            offres = offres.stream().filter(o -> o.getLocalisation().equalsIgnoreCase(localisation)).toList();
        }

        return offres;
    }







}

