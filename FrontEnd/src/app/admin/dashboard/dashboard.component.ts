import { Component, OnInit } from '@angular/core';
import { Partenaire } from 'src/app/core/models/partenaire.model';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  partenaires: Partenaire[] = []; // Liste des partenaires
  offres: any[] = []; // Liste des offres
  showFormPartenaire: boolean = false; // Contrôle l'affichage du formulaire de partenaire
  showFormOffre: boolean = false; // Contrôle l'affichage du formulaire d'offre
  newPartenaire: Partenaire = new Partenaire(); // Nouveau partenaire
  newOffre: any = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null, nombrePlaces: 0, dateFin: '' }; // Nouvelle offre
  editPartenaire: Partenaire | null = null; // Partenaire en cours d'édition
  editOffre: any | null = null; // Offre en cours d'édition
  formPartenaire: Partenaire = new Partenaire(); // Formulaire de partenaire
  formOffre: any = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null, nombrePlaces: 0, dateFin: '' }; // Formulaire d'offre
  showPopup: boolean = false; // Contrôle l'affichage du popup
  popupMessage: string = ''; // Message à afficher dans le popup
  showOffreList: boolean = false;
  p: number = 1; // Page actuelle pour les partenaires
  itemsPerPage: number = 5; // Nombre d'éléments par page
  pOffres: number = 1; // Page actuelle pour les offres
  constructor(
    private partenaireService: PartenaireService,
    private offreService: OffrePartenaireService
  ) {}

  ngOnInit(): void {
    this.getAllPartenaires(); // Charger tous les partenaires au démarrage
    this.getAllOffres(); // Charger toutes les offres au démarrage
  }
  toggleOffreList(): void {
    this.showOffreList = !this.showOffreList;
  }
  // Afficher/masquer le formulaire de partenaire
  toggleFormPartenaire(): void {
    this.showFormPartenaire = !this.showFormPartenaire;
    this.showFormOffre = false;
    this.resetFormPartenaire(); // Réinitialiser le formulaire
  }

  // Afficher/masquer le formulaire d'offre
  toggleFormOffre(): void {
    this.showFormOffre = !this.showFormOffre;
    this.showFormPartenaire = false;
    this.resetFormOffre(); // Réinitialiser le formulaire
  }

  // Charger tous les partenaires
  getAllPartenaires(): void {
    this.partenaireService.getAllPartenaires().subscribe((data) => {
      this.partenaires = data;
    });
  }

  // Charger toutes les offres
  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe((data) => {
      this.offres = data;
    });
  }

  // Supprimer un partenaire
  deletePartenaire(id?: number): void {
    if (id === undefined) {
      this.showPopupMessage('ID invalide !'); // Afficher le popup
      return;
    }
    if (confirm('Voulez-vous supprimer ce partenaire ?')) {
      this.partenaireService.deletePartenaire(id).subscribe({
        next: () => {
          this.showPopupMessage('Partenaire supprimé avec succès !'); // Afficher le popup
          this.getAllPartenaires(); // Rafraîchir la liste des partenaires
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du partenaire :', err);
          this.showPopupMessage('Une erreur s\'est produite lors de la suppression du partenaire.'); // Afficher le popup d'erreur
        },
      });
    }
  }

  // Charger le formulaire de modification d'un partenaire
  editPartenaireForm(partenaire: Partenaire): void {
    this.editPartenaire = partenaire;
    this.formPartenaire = { ...partenaire }; // Copier les données du partenaire
    this.showFormPartenaire = true;
  }

  // Réinitialiser le formulaire de partenaire
  resetFormPartenaire(): void {
    this.formPartenaire = new Partenaire();
    this.editPartenaire = null;
  }

  // Sauvegarder (ajouter ou mettre à jour) un partenaire
  savePartenaire(): void {
    if (this.editPartenaire) {
      this.partenaireService.updatePartenaire(this.editPartenaire.id!, this.formPartenaire).subscribe({
        next: () => {
          this.showPopupMessage('✅ Partenaire mis à jour avec succès !');
          this.getAllPartenaires();
          this.showFormPartenaire = false;
          this.resetFormPartenaire();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du partenaire :', err);
          this.showPopupMessage('❌ Une erreur s\'est produite lors de la mise à jour.');
        },
      });
    } else {
      this.partenaireService.addPartenaire(this.formPartenaire).subscribe({
        next: () => {
          this.showPopupMessage('✅ Partenaire ajouté avec succès !');
          this.getAllPartenaires();
          this.showFormPartenaire = false;
          this.resetFormPartenaire();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du partenaire :', err);
          this.showPopupMessage('❌ Erreur lors de l\'ajout du partenaire.');
        },
      });
    }
  }


  // Supprimer une offre
  deleteOffre(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.offreService.deleteOffre(id).subscribe({
        next: () => {
          this.showPopupMessage('Offre supprimée avec succès !'); // Afficher le popup
          this.getAllOffres(); // Rafraîchir la liste des offres
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'offre :', err);
          this.showPopupMessage('Une erreur s\'est produite lors de la suppression de l\'offre.'); // Afficher le popup d'erreur
        },
      });
    }
  }

  // Charger le formulaire de modification d'une offre
  editOffreForm(offre: any): void {
    this.editOffre = offre;
    this.formOffre = { ...offre }; // Copier les données de l'offre
    this.showFormOffre = true;
  }

  // Réinitialiser le formulaire d'offre
  resetFormOffre(): void {
    this.formOffre = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null, nombrePlaces: 0, dateFin: '' };
    this.editOffre = null;
  }

  // Sauvegarder (ajouter ou mettre à jour) une offre
  saveOffre(): void {
    if (this.editOffre) {
      // Mettre à jour l'offre existante
      this.offreService.updateOffre(this.editOffre.id, this.formOffre).subscribe({
        next: () => {
          this.showPopupMessage('Offre mise à jour avec succès !'); // Afficher le popup
          this.getAllOffres(); // Rafraîchir la liste des offres
          this.showFormOffre = false; // Fermer le formulaire
          this.resetFormOffre(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'offre :', err);
          this.showPopupMessage('Une erreur s\'est produite lors de la mise à jour de l\'offre.'); // Afficher le popup d'erreur
        },
      });
    } else {
      // Ajouter une nouvelle offre
      this.offreService.addOffre(this.formOffre).subscribe({
        next: () => {
          this.showPopupMessage('Offre ajoutée avec succès !'); // Afficher le popup
          this.getAllOffres(); // Rafraîchir la liste des offres
          this.showFormOffre = false; // Fermer le formulaire
          this.resetFormOffre(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'offre :', err);
          this.showPopupMessage('Une erreur s\'est produite lors de l\'ajout de l\'offre.'); // Afficher le popup d'erreur
        },
      });
    }
  }

  // Afficher un message dans le popup
  showPopupMessage(message: string): void {
    this.popupMessage = message;
    this.showPopup = true;
  }

  // Fermer le popup
  closePopup(): void {
    this.showPopup = false;
  }
}
