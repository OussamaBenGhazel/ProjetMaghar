import { Component } from '@angular/core';
import { PartenaireService } from '../../../services/Partenaire-Service/partenaire.service';
import { Router } from '@angular/router';
import { Partenaire } from 'src/app/core/models/partenaire.model';

@Component({
  selector: 'app-partenaire-form',
  templateUrl: './partenaire-form.component.html',
  styleUrls: ['./partenaire-form.component.css']
})
export class PartenaireFormComponent {
  partenaire: Partenaire = new Partenaire(); // Initialisation avec le modèle

  constructor(private partenaireService: PartenaireService, private router: Router) {}

  onSubmit() {
    console.log('Données du formulaire avant envoi:', this.partenaire);
    this.partenaireService.addPartenaire(this.partenaire).subscribe(
      response => {
        console.log('Partenaire ajouté avec succès', response);
        this.router.navigate(['/admin/partenaires']);
      },
      error => {
        console.error('Erreur lors de l\'ajout du partenaire', error);
      }
    );
  }


}
