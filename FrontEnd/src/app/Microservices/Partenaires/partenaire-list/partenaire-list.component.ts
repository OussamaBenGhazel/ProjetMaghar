import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';

@Component({
  selector: 'app-partenaire-list',
  templateUrl: './partenaire-list.component.html',
  styleUrls: ['./partenaire-list.component.css']
})
export class PartenaireListComponent implements OnInit {
  partenaires: any[] = [];

  constructor(private partenaireService: PartenaireService, private router: Router) {}

  ngOnInit() {
    this.loadPartenaires();
  }

  loadPartenaires() {
    this.partenaireService.getAllPartenaires().subscribe(data => {
      this.partenaires = data;
    });
  }

  deletePartenaire(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce partenaire ?')) {
      this.partenaireService.deletePartenaire(id).subscribe(() => {
        alert('Partenaire supprimé avec succès !');
        this.loadPartenaires(); // Recharger la liste après suppression
      });
    }
  }

  modifierPartenaire(id: number) {
    this.router.navigate(['/admin/partenaire-edit', id]); // Redirection vers le formulaire de modification
  }
}
