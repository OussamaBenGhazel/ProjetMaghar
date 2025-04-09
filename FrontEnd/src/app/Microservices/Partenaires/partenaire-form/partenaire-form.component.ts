import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partenaire } from '../../../core/models/partenaire.model';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';

@Component({
  selector: 'app-partenaire-form',
  templateUrl: './partenaire-form.component.html',
  styleUrls: ['./partenaire-form.component.css']
})
export class PartenaireFormComponent implements OnInit {

  partenaires: Partenaire[] = []; // Liste des partenaires
  formPartenaire: Partenaire = new Partenaire(); // Formulaire de partenaire
  editPartenaire: Partenaire | null = null; // Partenaire en cours d'édition
  showFormPartenaire: boolean = false; // Contrôle l'affichage du formulaire de partenaire
  showFormOffre: boolean = false; // Contrôle l'affichage du formulaire d'offre
  showPopup: boolean = false; // Contrôle l'affichage du popup
  popupMessage: string = ''; // Message du popup

  constructor(private partenaireService: PartenaireService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPartenaires();
  }

  // Récupère la liste de tous les partenaires
  getAllPartenaires(): void {
    this.partenaireService.getAllPartenaires().subscribe({
      next: (data) => this.partenaires = data,
      error: (err) => console.error('Erreur lors du chargement des partenaires :', err)
    });
  }

  // Ajoute ou met à jour un partenaire
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

  // Réinitialise le formulaire de partenaire
  resetFormPartenaire(): void {
    this.formPartenaire = new Partenaire();
    this.editPartenaire = null;
  }

  // Affiche ou masque le formulaire de partenaire
  toggleFormPartenaire(): void {
    this.showFormPartenaire = !this.showFormPartenaire;
    this.showFormOffre = false;
    this.resetFormPartenaire();
  }

  // Affiche un message dans un popup
  showPopupMessage(message: string): void {
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000); // Fermer après 3 secondes
  }

  // Méthode pour éditer un partenaire depuis la liste
  editExistingPartenaire(partenaire: Partenaire): void {
    this.editPartenaire = partenaire;
    this.formPartenaire = { ...partenaire }; // clone
    this.showFormPartenaire = true;
  }
}
