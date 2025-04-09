package tn.esprit.Microservice_Recrutement;

public class CandidatureDTO {
    private Long id;
    private String nom;
    private String email;
    private String cvUrl;
    private String lettreMotivation;
    private String statut;
    private String analyseResult;
    private OffreEmploiDTO offreEmploi;

    public CandidatureDTO() {}
    public CandidatureDTO(Candidature candidature) {
        this.id = candidature.getId();
        this.nom = candidature.getNom();
        this.email = candidature.getEmail();
        this.lettreMotivation = candidature.getLettreMotivation();
        this.statut = candidature.getStatut();
        this.analyseResult = candidature.getAnalyseResult();
        this.offreEmploi = candidature.getOffreEmploi() != null ? new OffreEmploiDTO(candidature.getOffreEmploi()) : null;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCvUrl() { return cvUrl; }
    public void setCvUrl(String cvUrl) { this.cvUrl = cvUrl; }
    public String getLettreMotivation() { return lettreMotivation; }
    public void setLettreMotivation(String lettreMotivation) { this.lettreMotivation = lettreMotivation; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public String getAnalyseResult() { return analyseResult; }
    public void setAnalyseResult(String analyseResult) { this.analyseResult = analyseResult; }
    public OffreEmploiDTO getOffreEmploi() { return offreEmploi; }
    public void setOffreEmploi(OffreEmploiDTO offreEmploi) { this.offreEmploi = offreEmploi; }
}