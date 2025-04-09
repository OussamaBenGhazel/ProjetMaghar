package tn.esprit.Microservice_Recrutement;

public class OffreEmploiDTO {
    private Long id;
    private String titre;
    private String description;
    private String categorie;
    private String localisation;
    private Double salaireMin;
    private Double salaireMax;
    private String typeContrat;
    private String competencesRequises;
    private int nombreCandidatures;

    public OffreEmploiDTO(OffreEmploi offreEmploi) {
        this.id = offreEmploi.getId();
        this.titre = offreEmploi.getTitre();
        this.description = offreEmploi.getDescription();
        this.categorie = offreEmploi.getCategorie();
        this.localisation = offreEmploi.getLocalisation();
        this.salaireMin = offreEmploi.getSalaireMin();
        this.salaireMax = offreEmploi.getSalaireMax();
        this.typeContrat = offreEmploi.getTypeContrat();
        this.competencesRequises = offreEmploi.getCompetencesRequises();
        this.nombreCandidatures = offreEmploi.getCandidatures() != null ? offreEmploi.getCandidatures().size() : 0;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public Double getSalaireMin() {
        return salaireMin;
    }

    public void setSalaireMin(Double salaireMin) {
        this.salaireMin = salaireMin;
    }

    public Double getSalaireMax() {
        return salaireMax;
    }

    public void setSalaireMax(Double salaireMax) {
        this.salaireMax = salaireMax;
    }

    public String getTypeContrat() {
        return typeContrat;
    }

    public void setTypeContrat(String typeContrat) {
        this.typeContrat = typeContrat;
    }

    public String getCompetencesRequises() {
        return competencesRequises;
    }

    public void setCompetencesRequises(String competencesRequises) {
        this.competencesRequises = competencesRequises;
    }

    public int getNombreCandidatures() {
        return nombreCandidatures;
    }

    public void setNombreCandidatures(int nombreCandidatures) {
        this.nombreCandidatures = nombreCandidatures;
    }
}