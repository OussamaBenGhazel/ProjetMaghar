import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';

@Component({
  selector: 'app-offre-partenaire-list',
  templateUrl: './offre-partenaire-list.component.html',
  styleUrls: ['./offre-partenaire-list.component.css']
})
export class OffrePartenaireListComponent implements OnInit {
  offres: any[] = [];  // Tableau pour stocker les offres
<<<<<<< HEAD

=======
  selectedOffre: any = null;  // Offre sélectionnée pour la modification
  isEditing: boolean = false;  // Contrôle l'affichage du formulaire de modification
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8

  constructor(
    private offreService: OffrePartenaireService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllOffres();  // Récupérer toutes les offres au chargement du composant
  }

  // Récupérer toutes les offres
  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data) => {
        this.offres = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    );
  }

<<<<<<< HEAD
  // Méthode pour rediriger vers le formulaire de modification d'une offre
  editOffre(id: number): void {
    this.router.navigate([`/admin/offre-partenaire-edit/${id}`]);
=======
  // Méthode pour afficher le formulaire de modification
  editOffre(offre: any): void {
    this.selectedOffre = { ...offre };  // Copie de l'offre sélectionnée
    this.isEditing = true;  // Activer l'affichage du formulaire
  }

  // Méthode pour annuler la modification
  cancelEdit(): void {
    this.selectedOffre = null;
    this.isEditing = false;
  }

  // Méthode pour soumettre la modification
  submitEdit(): void {
    this.offreService.updateOffre(this.selectedOffre.id, this.selectedOffre).subscribe(
      () => {
        this.getAllOffres();  // Rafraîchir la liste après la modification
        this.cancelEdit();  // Masquer le formulaire
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'offre', error);
      }
    );
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
  }

  // Méthode pour supprimer une offre
  deleteOffre(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      this.offreService.deleteOffre(id).subscribe(
        () => {
          this.getAllOffres();  // Rafraîchir la liste après la suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'offre', error);
        }
      );
    }
  }
}
