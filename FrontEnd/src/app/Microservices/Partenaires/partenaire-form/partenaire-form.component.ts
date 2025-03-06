import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partenaire } from '../../../core/models/partenaire.model';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';

@Component({
  selector: 'app-partenaire-form',
  templateUrl: './partenaire-form.component.html',
  styleUrls: ['./partenaire-form.component.css']
})
export class PartenaireFormComponent {
  partenaire: Partenaire = new Partenaire(); // Création d'un nouvel objet Partenaire

  constructor(private partenaireService: PartenaireService, private router: Router) {}

  ajouterPartenaire() {
    this.partenaireService.addPartenaire(this.partenaire).subscribe(() => {
      alert('Partenaire ajouté avec succès !'); // ✅ Message de confirmation (optionnel)
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
