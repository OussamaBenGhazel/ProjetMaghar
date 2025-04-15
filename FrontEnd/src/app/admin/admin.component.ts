import { Component, OnInit } from '@angular/core';
import { Partenaire } from 'src/app/core/models/partenaire.model';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  partenaires: Partenaire[] = [];
  offres: any[] = [];
  showFormPartenaire: boolean = false;
  showFormOffre: boolean = false;
  newPartenaire: Partenaire = new Partenaire();

  toggleFormPartenaire(): void {
    this.showFormPartenaire = !this.showFormPartenaire;
    this.showFormOffre = false;
  }

  toggleFormOffre(): void {
    this.showFormOffre = !this.showFormOffre;
    this.showFormPartenaire = false;
  }

}
