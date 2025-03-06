package tn.esprit.Microservice_Reclamation.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Entity
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String clientName;

    @Size(min = 3, max = 100)
    private String typeReclamation;

    @NotNull
    @Size(min = 5, max = 100)
    private String titre;

    private String description;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateCreation;


    public Reclamation() {}

    public Reclamation(String clientName, String typeReclamation, String titre, String description) {
        this.clientName = clientName;
        this.typeReclamation = typeReclamation;
        this.titre = titre;
        this.description = description;
    }

    @PrePersist
    public void prePersist() {
        if (this.statut == null) {
            this.statut = Statut.EN_ATTENTE; // Valeur par défaut
        }
        if (this.dateCreation == null) {
            this.dateCreation = LocalDate.now(); // Valeur par défaut
        }
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getTypeReclamation() {
        return typeReclamation;
    }

    public void setTypeReclamation(String typeReclamation) {
        this.typeReclamation = typeReclamation;
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

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }
}

