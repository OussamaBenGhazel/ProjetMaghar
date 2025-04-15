package tn.esprit.Microservice_Assurance.model;
public enum StatutFacture {
    EN_ATTENTE,
    EN_ATTENTE_CONFIRMATION, // Ajoutez ce statut pour les paiements nécessitant une confirmation (ex. 3D Secure)
    PAYEE,
    ECHEC
}