package tn.esprit.Microservice_Assurance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "devis")
public class Devis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Référence unique du devis
    @Column(name = "numero_devis", nullable = false, unique = true)
    private String numeroDevis;

    // Référence vers le client (géré dans le microservice Gestion User)
    @Column(name = "UserId", nullable = false)
    private Long UserId;


    // Estimation globale de la prime
    @Column(name = "prime_estimee")
    private BigDecimal primeEstimee;

    // Somme assurée globale pour ce devis
    @Column(name = "montant_assure_total")
    private BigDecimal montantAssureTotal;

    // Date limite de validité du devis
    @Column(name = "date_validite")
    private LocalDate dateValidite;

    // Statut du devis (DRAFT, PENDING, APPROVED, REJECTED)
    @Enumerated(EnumType.STRING)
    private StatutDevis statut;

    // Dates d'audit
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    //  les  jointure



    // Liste des produits d'assurance sélectionnés dans ce devis
    @ManyToMany
    @JoinTable(
            name = "devis_assurances",
            joinColumns = @JoinColumn(name = "devis_id"),
            inverseJoinColumns = @JoinColumn(name = "assurance_id")
    )
    private Set<Assurance> assurances = new HashSet<>();


    // Jointure One-to-Many vers Contrat
    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contrat> contrats = new ArrayList<>();


    // Getters, setters, constructeurs...


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroDevis() {
        return numeroDevis;
    }

    public void setNumeroDevis(String numeroDevis) {
        this.numeroDevis = numeroDevis;
    }

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }

    public BigDecimal getPrimeEstimee() {
        return primeEstimee;
    }

    public void setPrimeEstimee(BigDecimal primeEstimee) {
        this.primeEstimee = primeEstimee;
    }

    public BigDecimal getMontantAssureTotal() {
        return montantAssureTotal;
    }

    public void setMontantAssureTotal(BigDecimal montantAssureTotal) {
        this.montantAssureTotal = montantAssureTotal;
    }

    public LocalDate getDateValidite() {
        return dateValidite;
    }

    public void setDateValidite(LocalDate dateValidite) {
        this.dateValidite = dateValidite;
    }

    public StatutDevis getStatut() {
        return statut;
    }

    public void setStatut(StatutDevis statut) {
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

    public Set<Assurance> getAssurances() {
        return assurances;
    }

    public void setAssurances(Set<Assurance> assurances) {
        this.assurances = assurances;
    }

    public List<Contrat> getContrats() {
        return contrats;
    }

    public void setContrats(List<Contrat> contrats) {
        this.contrats = contrats;
    }
}
