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

  // Méthode pour rediriger vers le formulaire de modification d'une offre
  editOffre(id: number): void {
    this.router.navigate([`/admin/offre-partenaire-edit/${id}`]);
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
