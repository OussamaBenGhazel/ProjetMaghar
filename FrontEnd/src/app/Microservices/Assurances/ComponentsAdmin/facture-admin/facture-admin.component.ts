import { Component, OnInit } from '@angular/core';
import { Facture, StatutFacture } from 'src/app/core/models/Facture .model';
import { FactureService } from 'src/app/services/Assurance-service/facture.service';

@Component({
  selector: 'app-facture-admin',
  templateUrl: './facture-admin.component.html',
  styleUrls: ['./facture-admin.component.css']
})
export class FactureAdminComponent implements OnInit {
  factures: Facture[] = [];
  filteredFactures: Facture[] = [];
  p: number = 1; // Page actuelle pour la pagination
  itemsPerPage: number = 5; // Nombre de factures par page
  filterStatut: StatutFacture | '' = ''; // Filtre par statut

  readonly statuts = Object.values(StatutFacture);

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  // Charger toutes les factures (ajoutez cette méthode dans FactureService si elle n'existe pas)
  loadFactures(): void {
    // Supposons que FactureService ait une méthode getAllFactures
    this.factureService.getAllFactures().subscribe(
      (data: Facture[]) => {
        this.factures = data;
        this.filteredFactures = [...this.factures];
      },
      (error) => {
        console.error('Erreur lors du chargement des factures:', error);
      }
    );
  }

  // Filtrer les factures par statut
  filterFactures(): void {
    this.filteredFactures = this.factures.filter(facture =>
      !this.filterStatut || facture.statut === this.filterStatut
    );
    this.p = 1; // Réinitialiser la page à 1 après filtration
  }

  // Mettre à jour le filtre statut
  setFilterStatut(statut: StatutFacture | ''): void {
    this.filterStatut = statut;
    this.filterFactures();
  }

  // Redirection vers le téléchargement d'une facture (optionnel)
  downloadFacture(factureId: number): void {
    this.factureService.downloadFacture(factureId).subscribe(
      (file: Blob) => {
        const blob = new Blob([file], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Facture_${factureId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Erreur lors du téléchargement:', error);
      }
    );
  }
}