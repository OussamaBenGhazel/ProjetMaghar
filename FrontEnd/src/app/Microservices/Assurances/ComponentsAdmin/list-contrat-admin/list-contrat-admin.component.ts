import { Component, OnInit } from '@angular/core';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';

@Component({
  selector: 'app-list-contrat-admin',
  templateUrl: './list-contrat-admin.component.html',
  styleUrls: ['./list-contrat-admin.component.css']
})
export class ListContratAdminComponent implements OnInit {
  contrats: Contrat[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  contratToDelete: Contrat | null = null;
  showPopup: boolean = false;

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getAllContrats().subscribe(
      (data: Contrat[]) => {
        this.contrats = data.map(c => ({
          ...c,
          dateDebut: new Date(c.dateDebut),
          dateFin: new Date(c.dateFin)
        }));
        this.isLoading = false;
      },
      error => {
        console.error('❌ Erreur lors du chargement des contrats:', error);
        this.errorMessage = "Erreur lors du chargement des contrats.";
        this.isLoading = false;
      }
    );
  }

  viewDetails(id: number | undefined): void {
    if (id !== undefined) {
      console.log(`Voir les détails du contrat ${id}`);
      // Par exemple : this.router.navigate(['/contrat', id]);
    }
  }

  openDeletePopup(contrat: Contrat): void {
    this.contratToDelete = contrat;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.contratToDelete = null;
  }

  deleteContrat(): void {
    if (this.contratToDelete && this.contratToDelete.id) {
      this.contratService.deleteContrat(this.contratToDelete.id).subscribe(
        () => {
          this.contrats = this.contrats.filter(c => c.id !== this.contratToDelete!.id);
          console.log(`✅ Contrat ${this.contratToDelete!.id} supprimé`);
          this.closePopup();
        },
        error => {
          console.error('❌ Erreur lors de la suppression du contrat:', error);
          this.closePopup();
        }
      );
    }
  }

  // Méthode pour obtenir les étapes de la timeline
  getTimelineSteps(contrat: Contrat): { label: string; completed: boolean; active: boolean }[] {
    return [
      { label: 'En cours', completed: true, active: contrat.statut === 'InProgress' },
      { label: 'Paiement', completed: contrat.statut === 'PaymentPending' || contrat.statut === 'ACTIVE', active: contrat.statut === 'PaymentPending' },
      { label: 'Actif', completed: contrat.statut === 'ACTIVE', active: contrat.statut === 'ACTIVE' }
    ];
  }
}