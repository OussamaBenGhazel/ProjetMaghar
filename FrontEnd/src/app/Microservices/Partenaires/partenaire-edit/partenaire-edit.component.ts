import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';

@Component({
  selector: 'app-partenaire-edit',
  templateUrl: './partenaire-edit.component.html',
  styleUrls: ['./partenaire-edit.component.css']
})
export class PartenaireEditComponent implements OnInit {
  partenaireId!: number;
  partenaireData: any = {};

  constructor(
    private route: ActivatedRoute,
    private partenaireService: PartenaireService,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer l'ID depuis l'URL
    this.partenaireId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger les données du partenaire avec l'ID
    this.partenaireService.getPartenaireById(this.partenaireId).subscribe(data => {
      this.partenaireData = data;
    });
  }

  updatePartenaire() {
    // Mettre à jour les données du partenaire
    this.partenaireService.updatePartenaire(this.partenaireId, this.partenaireData).subscribe(() => {
      alert('Partenaire mis à jour avec succès !');
      this.router.navigate(['/admin/dashboard']);  // 🔄 Redirection vers la liste des partenaires
    });
  }
}
