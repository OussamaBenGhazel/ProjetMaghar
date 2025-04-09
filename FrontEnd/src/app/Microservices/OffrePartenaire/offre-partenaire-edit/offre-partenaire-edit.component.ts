// offre-partenaire-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';

@Component({
  selector: 'app-offre-partenaire-edit',
  templateUrl: './offre-partenaire-edit.component.html',
  styleUrls: ['./offre-partenaire-edit.component.css']
})
export class OffrePartenaireEditComponent implements OnInit {
  offreId: number=0;
  offre: any = {};  // Initialisation de l'objet de l'offre

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offreService: OffrePartenaireService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'offre à modifier depuis l'URL
    this.offreId = +this.route.snapshot.paramMap.get('id')!;
    this.getOffreById(this.offreId);
    
  }

  // Récupérer les données de l'offre par son ID
  getOffreById(id: number): void {
    this.offreService.getOffreById(id).subscribe(
      (data) => {
        this.offre = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'offre', error);
      }
    );
  }

  // Soumettre le formulaire de modification
  onSubmit(): void {
    this.offreService.updateOffre(this.offreId, this.offre).subscribe(
      () => {
        this.router.navigate(['/admin/dashboard']);  // Rediriger vers le dashboard après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'offre', error);
      }
    );
  }
}
