package tn.esprit.Microservice_Assurance.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "contrats")
public class Contrat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Référence unique du contrat
    @Column(name = "numero_contrat", nullable = false, unique = true)
    private String numeroContrat;

    // Référence vers le client (géré dans le microservice Gestion User)
    @Column(name = "UserId", nullable = false)
    private Long UserId;

    // Référence optionnelle vers le devis utilisé pour la souscription
    @Column(name = "reference_devis")
    private Long referenceDevis;


    // Période de validité du contrat
    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    // Prime confirmée et somme assurée définie dans le contrat
    private BigDecimal prime;

    @Column(name = "montant_assure")
    private BigDecimal montantAssure;

    // Conditions particulières du contrat
    @Column(name = "conditions_generales", length = 3000)
    private String conditionsGenerales;

    // Statut du contrat (ACTIVE, CANCELLED, EXPIRED)
    @Enumerated(EnumType.STRING)
    private StatutContrat statut;

    // Dates d'audit
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "signature", columnDefinition = "TEXT")
    private String signature;  // Stockage en base64 (image encodée)




    //  les   jointure


    // Le produit d'assurance associé au contrat (relation Many-to-One)
    @ManyToOne
    @JoinColumn(name = "assurance_id", nullable = false)
    private Assurance assurance;


    // Optionnel : le devis qui a permis la création du contrat
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devis_id")
    private Devis devis;

    // Relation One-to-One avec Facture
    @OneToOne(mappedBy = "contrat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Facture facture;


    // Getters, setters, constructeurs...


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroContrat() {
        return numeroContrat;
    }

    public void setNumeroContrat(String numeroContrat) {
        this.numeroContrat = numeroContrat;
    }

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }

    public Long getReferenceDevis() {
        return referenceDevis;
    }

    public void setReferenceDevis(Long referenceDevis) {
        this.referenceDevis = referenceDevis;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public BigDecimal getPrime() {
        return prime;
    }

    public void setPrime(BigDecimal prime) {
        this.prime = prime;
    }

    public BigDecimal getMontantAssure() {
        return montantAssure;
    }

    public void setMontantAssure(BigDecimal montantAssure) {
        this.montantAssure = montantAssure;
    }

    public String getConditionsGenerales() {
        return conditionsGenerales;
    }

    public void setConditionsGenerales(String conditionsGenerales) {
        this.conditionsGenerales = conditionsGenerales;
    }

    public StatutContrat getStatut() {
        return statut;
    }

    public void setStatut(StatutContrat statut) {
        this.statut = statut;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Assurance getAssurance() {
        return assurance;
    }

    public void setAssurance(Assurance assurance) {
        this.assurance = assurance;
    }

    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }

    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }
}

