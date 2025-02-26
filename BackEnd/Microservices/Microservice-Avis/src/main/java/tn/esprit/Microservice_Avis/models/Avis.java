package tn.esprit.Microservice_Avis.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

import static jakarta.persistence.TemporalType.TIMESTAMP;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Avis {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @NotNull(message = "La note est obligatoire")
    private Double note;

    @Column(length = 250)
    private String commentaire;

    @CreationTimestamp
    @Temporal(TIMESTAMP)
    private Date dateCreation;

    @UpdateTimestamp
    @Temporal(TIMESTAMP)
    private Date dateUpdate;

}
