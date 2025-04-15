import { Component, OnInit } from '@angular/core';
import { Partenaire } from 'src/app/core/models/partenaire.model';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  partenaires: Partenaire[] = [];
  offres: any[] = [];
  showFormPartenaire: boolean = false;
  showFormOffre: boolean = false;
  newPartenaire: Partenaire = new Partenaire();
  

  constructor(
    private partenaireService: PartenaireService,
    private offreService: OffrePartenaireService
  ) {}

  ngOnInit(): void {
    this.getAllPartenaires();
    this.getAllOffres();
  }

  toggleFormPartenaire(): void {
    this.showFormPartenaire = !this.showFormPartenaire;
    this.showFormOffre = false;
  }

  toggleFormOffre(): void {
    this.showFormOffre = !this.showFormOffre;
    this.showFormPartenaire = false;
  }

  getAllPartenaires(): void {
    this.partenaireService.getAllPartenaires().subscribe((data) => {
      this.partenaires = data;
    });
  }

// Tableau des offres (seulement les informations, pas les actions de suppression et modification)
getAllOffres(): void {
  this.offreService.getAllOffres().subscribe((data) => {
    this.offres = data;
  });
}

  deletePartenaire(id?: number): void {
    if (id === undefined) {
      alert("ID invalide !");
      return;
    }
    if (confirm("Voulez-vous supprimer ce partenaire ?")) {
      this.partenaireService.deletePartenaire(id).subscribe(() => {
        alert("Partenaire supprimé !");
        this.getAllPartenaires();
      });
    }
  }

  addPartenaire(): void {
    this.partenaireService.addPartenaire(this.newPartenaire).subscribe(() => {
      alert("Partenaire ajouté !");
      this.newPartenaire = new Partenaire();
      this.showFormPartenaire = false;
      this.getAllPartenaires();
    });
  }

  deleteOffre(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.offreService.deleteOffre(id).subscribe(() => {
        alert('Offre supprimée avec succès !');
        this.getAllOffres();
      });
    }
  }

  // Cette méthode est appelée après l'ajout d'une nouvelle offre
  onOfferAdded(): void {
    this.getAllOffres(); // Actualiser la liste des offres
  }
}
