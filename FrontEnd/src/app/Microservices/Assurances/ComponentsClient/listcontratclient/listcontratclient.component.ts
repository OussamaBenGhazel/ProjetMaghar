import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';

@Component({
  selector: 'app-listcontratclient',
  templateUrl: './listcontratclient.component.html',
  styleUrls: ['./listcontratclient.component.css']
})
export class ListcontratclientComponent implements OnInit {
  contrats: Contrat[] = [];
  filteredContrats: Contrat[] = [];
  contratToDelete: Contrat | null = null;
  showPopup: boolean = false;
  filterDateDebut: string = '';
  filterDateFin: string = '';
  filterStatut: StatutContrat | '' = ''; // Filtre par statut ('' pour tous les statuts)

  readonly statuts = Object.values(StatutContrat); // Liste des statuts possibles depuis l'enum

  constructor(private contratService: ContratService, private router: Router) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getAllContrats().subscribe(
      (response: any) => {
        console.log('Réponse brute reçue :', response);
        try {
          this.contrats = response;
          this.filteredContrats = [...this.contrats];
        } catch (error) {
          console.error("Erreur de parsing JSON :", error);
        }
      },
      error => {
        console.error('Erreur lors du chargement des contrats:', error);
      }
    );
  }

  filterContrats(): void {
    let filtered = [...this.contrats];

    // Filtre par date
    const debut = this.filterDateDebut ? new Date(this.filterDateDebut) : null;
    const fin = this.filterDateFin ? new Date(this.filterDateFin) : null;

    filtered = filtered.filter(contrat => {
      const dateDebutContrat = new Date(contrat.dateDebut);
      const dateFinContrat = new Date(contrat.dateFin);

      const isAfterDebut = debut ? dateDebutContrat >= debut : true;
      const isBeforeFin = fin ? dateFinContrat <= fin : true;

      return isAfterDebut && isBeforeFin;
    });

    // Filtre par statut
    if (this.filterStatut) {
      filtered = filtered.filter(contrat => contrat.statut === this.filterStatut);
    }

    this.filteredContrats = filtered;
  }

  setFilterStatut(statut: StatutContrat | ''): void {
    this.filterStatut = statut;
    this.filterContrats();
  }

  resetFilters(): void {
    this.filterDateDebut = '';
    this.filterDateFin = '';
    this.filterStatut = '';
    this.filterContrats();
  }

  openDeletePopup(contrat: Contrat): void {
    this.contratToDelete = contrat;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  confirmDelete(): void {
    if (this.contratToDelete) {
      this.contratService.deleteContrat(this.contratToDelete.id!).subscribe(
        () => {
          console.log('Contrat supprimé avec succès');
          this.contrats = this.contrats.filter(c => c.id !== this.contratToDelete?.id);
          this.filterContrats();
          this.closePopup();
        },
        error => {
          console.error('Erreur lors de la suppression du contrat:', error);
        }
      );
    }
  }

  payContrat(contratId: number): void {
    this.router.navigate(['/factureclient', contratId]);
  }

  viewContrat(contratId: number): void {
    this.router.navigate([`/contrat/${contratId}`]);
  }

  editContrat(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/contrat-form', id]);
    } else {
      console.error('Contrat ID is undefined');
    }
  }
}