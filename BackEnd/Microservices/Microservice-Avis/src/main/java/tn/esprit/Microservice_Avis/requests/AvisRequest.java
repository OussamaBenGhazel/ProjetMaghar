package tn.esprit.Microservice_Avis.requests;

import jakarta.validation.constraints.*;

public record AvisRequest(

        @NotNull(message = "La note est obligatoire")
        @Min(value = 0, message = "La note doit être au minimum 0")
        @Max(value = 10, message = "La note doit être au maximum 5")
        Double note,

        @NotBlank(message = "Le commentaire ne peut pas être vide")
        @Size(min = 10, max = 1000, message = "Le commentaire doit contenir entre 10 et 1000 caractères")
        String commentaire
) {
}
