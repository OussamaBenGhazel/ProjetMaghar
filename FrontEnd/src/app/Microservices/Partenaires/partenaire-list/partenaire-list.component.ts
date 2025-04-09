import { Component, OnInit } from '@angular/core';
import { Partenaire } from 'src/app/core/models/partenaire.model';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';

@Component({
  selector: 'app-partenaire-list',
  templateUrl: './partenaire-list.component.html',
  styleUrls: ['./partenaire-list.component.css']
})
export class PartenaireListComponent implements OnInit {
  partenaires: Partenaire[] = [];

  constructor(private partenaireService: PartenaireService) {}

  ngOnInit(): void {
    this.loadPartenaires();
  }

  // Charger la liste des partenaires
  loadPartenaires(): void {
    this.partenaireService.getAllPartenaires().subscribe((data) => {
      this.partenaires = data;
    });
  }

  // Supprimer un partenaire
  deletePartenaire(id: number): void {
    this.partenaireService.deletePartenaire(id).subscribe(() => {
      this.loadPartenaires();  // Recharger la liste après suppression
    });
  }
}
