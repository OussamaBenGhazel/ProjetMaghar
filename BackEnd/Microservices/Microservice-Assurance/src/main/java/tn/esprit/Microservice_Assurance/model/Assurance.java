package tn.esprit.Microservice_Assurance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "assurances")
public class Assurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nom du produit d'assurance (ex: "Assurance Auto Premium")
    @Column(nullable = false, length = 100)
    private String nom;

    // Description détaillée du produit
    @Column(length = 2000)
    private String description;

    // Détail des garanties et couvertures offertes
    @Column(name = "couverture_details", length = 2000)
    private String couvertureDetails;

    // Prime à payer par le client
    @Column(nullable = false)
    private BigDecimal prime;

    // Somme maximale assurée en cas de sinistre
    @Column(name = "montant_assure")
    private BigDecimal montantAssure;

    // Franchise (montant restant à charge du client)
    private BigDecimal deductible;

    // Type d'assurance : SANTE, AUTOMOBILE, VOYAGE, HABITATION
    @Enumerated(EnumType.STRING)
    @Column(name = "type_assurance", nullable = false)
    private TypeAssurance type;

    // Conditions générales et clauses spécifiques
    @Column(name = "conditions_generales", length = 3000)
    private String conditionsGenerales;

    // Date d'activation du produit
    @Column(name = "date_effective")
    private LocalDate dateEffective;

    // Date de fin de validité du produit
    @Column(name = "date_expiration")
    private LocalDate dateExpiration;

    // Statut du produit (ACTIVE, INACTIVE)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutProduit statut;

    // Dates de création et de mise à jour (pour audit)
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



    //  les   jointure

    @JsonIgnore
    @ManyToMany(mappedBy = "assurances")
    private Set<Devis> devis = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCouvertureDetails() {
        return couvertureDetails;
    }

    public void setCouvertureDetails(String couvertureDetails) {
        this.couvertureDetails = couvertureDetails;
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

    public BigDecimal getDeductible() {
        return deductible;
    }

    public void setDeductible(BigDecimal deductible) {
        this.deductible = deductible;
    }

    public TypeAssurance getType() {
        return type;
    }

    public void setType(TypeAssurance type) {
        this.type = type;
    }

    public String getConditionsGenerales() {
        return conditionsGenerales;
    }

    public void setConditionsGenerales(String conditionsGenerales) {
        this.conditionsGenerales = conditionsGenerales;
    }

    public LocalDate getDateEffective() {
        return dateEffective;
    }

    public void setDateEffective(LocalDate dateEffective) {
        this.dateEffective = dateEffective;
    }

    public LocalDate getDateExpiration() {
        return dateExpiration;
    }

    public void setDateExpiration(LocalDate dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    public StatutProduit getStatut() {
        return statut;
    }

    public void setStatut(StatutProduit statut) {
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

    public Set<Devis> getDevis() {
        return devis;
    }

    public void setDevis(Set<Devis> devis) {
        this.devis = devis;
    }
}
