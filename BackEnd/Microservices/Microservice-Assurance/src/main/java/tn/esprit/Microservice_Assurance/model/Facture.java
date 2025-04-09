package tn.esprit.Microservice_Assurance.model;

import jakarta.persistence.*;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "factures")
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Référence vers le client (géré dans le microservice Gestion User)
    @Column(name = "UserId")
    private Long UserId;


    // Référence unique de la facture
    @Column(name = "numero_facture")
    private String numeroFacture;

    // Relation One-to-One avec Contrat
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "contrat_id" )
    private Contrat contrat;

    // Date d'émission de la facture
    @Column(name = "date_emission")
    private LocalDate dateEmission;



    // Date d'échéance de la factur@NonNull

    @Column(name = "date_echeance")
    private LocalDate dateEcheance;

    // Montant total de la facture (typiquement le montant de la prime)
    @Column(name = "montant_total", nullable = false)
    private BigDecimal montantTotal;

    // Montant des taxes (TVA) si applicable
    @Column(name = "montant_taxes")
    private BigDecimal montantTaxes;

    // Taux de taxe appliqué (en pourcentage)
    @Column(name = "taux_taxe")
    private BigDecimal tauxTaxe;

    // Statut de la facture
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutFacture statut;

    // Référence du paiement Stripe lorsque payée
    @Column(name = "reference_paiement")
    private String referencePaiement;

    // URL de redirection pour le paiement Stripe
    @Column(name = "url_paiement")
    private String urlPaiement;

    // Commentaires ou notes additionnels
    @Column(length = 1000)
    private String commentaires;

    // Dates d'audit
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



    // Constructeurs, getters et setters
    public Facture() {
        // Constructeur par défaut
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroFacture() {
        return numeroFacture;
    }

    public void setNumeroFacture(String numeroFacture) {
        this.numeroFacture = numeroFacture;
    }

    public Contrat getContrat() {
        return contrat;
    }

    public void setContrat(Contrat contrat) {
        this.contrat = contrat;
    }

    public LocalDate getDateEmission() {
        return dateEmission;
    }

    public void setDateEmission(LocalDate dateEmission) {
        this.dateEmission = dateEmission;
    }

    public LocalDate getDateEcheance() {
        return dateEcheance;
    }

    public void setDateEcheance(LocalDate dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public BigDecimal getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public BigDecimal getMontantTaxes() {
        return montantTaxes;
    }

    public void setMontantTaxes(BigDecimal montantTaxes) {
        this.montantTaxes = montantTaxes;
    }

    public BigDecimal getTauxTaxe() {
        return tauxTaxe;
    }

    public void setTauxTaxe(BigDecimal tauxTaxe) {
        this.tauxTaxe = tauxTaxe;
    }

    public StatutFacture getStatut() {
        return statut;
    }

    public void setStatut(StatutFacture statut) {
        this.statut = statut;
    }

    public String getReferencePaiement() {
        return referencePaiement;
    }

    public void setReferencePaiement(String referencePaiement) {
        this.referencePaiement = referencePaiement;
    }

    public String getUrlPaiement() {
        return urlPaiement;
    }

    public void setUrlPaiement(String urlPaiement) {
        this.urlPaiement = urlPaiement;
    }

    public String getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(String commentaires) {
        this.commentaires = commentaires;
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

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }
}