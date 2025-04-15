import { Component } from '@angular/core';
import { RendezVous } from 'src/app/models/rendez-vous.model';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
    selector: 'app-add-rendezvous',
    templateUrl: './add-rendezvous.component.html',
    styleUrls: ['./add-rendezvous.component.css']
})
export class AddRendezvousComponent {
    rendezVous: RendezVous = new RendezVous();

    constructor(private rendezVousService: RendezVousService) {}

    creerRendezVous() {
        // Validation du numéro de téléphone
        if (!this.rendezVous.numeroTelephoneClient || this.rendezVous.numeroTelephoneClient.trim() === '') {
            alert('Le numéro de téléphone est requis.');
            return;
        }

        // Validation simple du format (doit contenir uniquement des chiffres)
        const phonePattern = /^[0-9]+$/;
        if (!phonePattern.test(this.rendezVous.numeroTelephoneClient)) {
            alert('Le numéro de téléphone doit contenir uniquement des chiffres.');
            return;
        }

        if (!this.rendezVous.statut) {
            this.rendezVous.statut = 'En attente';
        }

        if (!this.rendezVous.agentAssurance) {
            this.rendezVous.agentAssurance = undefined;
        }

        console.log('Données envoyées au backend :', JSON.stringify(this.rendezVous));

        this.rendezVousService.creerRendezVous(this.rendezVous).subscribe(
            response => {
                alert('Rendez-vous ajouté avec succès !');
                this.rendezVous = new RendezVous();
            },
            error => {
                console.error('Erreur complète :', error);
                let errorMessage = 'Erreur inconnue';
                if (error.status === 0) {
                    errorMessage = 'Erreur réseau : impossible de contacter le serveur. Vérifiez votre connexion ou la configuration CORS.';
                } else if (error.status === 404) {
                    errorMessage = 'Endpoint non trouvé. Vérifiez l\'URL ou assurez-vous que le serveur est démarré.';
                } else if (error.status === 400) {
                    errorMessage = 'Requête invalide : ' + (error.error?.message || 'Vérifiez les données envoyées.');
                } else if (error.error instanceof Object) {
                    errorMessage = error.error.message || JSON.stringify(error.error);
                } else {
                    errorMessage = error.error || error.message || 'Erreur inconnue';
                }
                alert('Échec de l\'ajout du rendez-vous : ' + errorMessage);
            }
        );
    }
}