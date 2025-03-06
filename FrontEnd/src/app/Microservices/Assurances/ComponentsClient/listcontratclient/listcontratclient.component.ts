import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';
import Swal from 'sweetalert2';

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
  filterStatut: StatutContrat | '' = '';
  p: number = 1; // Page actuelle pour la pagination
  itemsPerPage: number = 6; // Nombre d'éléments par page

  readonly statuts = Object.values(StatutContrat);

  constructor(private contratService: ContratService, private router: Router) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getAllContrats().subscribe(
      (response: any) => {
        console.log('Réponse brute reçue :', response);
        try {
          this.contrats = response.map((c: Contrat) => ({
            ...c,
            dateDebut: new Date(c.dateDebut),
            dateFin: new Date(c.dateFin)
          }));
          this.filteredContrats = [...this.contrats];
        } catch (error) {
          console.error('Erreur de parsing JSON :', error);
        }
      },
      error => {
        console.error('Erreur lors du chargement des contrats:', error);
      }
    );
  }

  filterContrats(): void {
    let filtered = [...this.contrats];

    const debut = this.filterDateDebut ? new Date(this.filterDateDebut) : null;
    const fin = this.filterDateFin ? new Date(this.filterDateFin) : null;

    filtered = filtered.filter(contrat => {
      const dateDebutContrat = new Date(contrat.dateDebut);
      const dateFinContrat = new Date(contrat.dateFin);

      const isAfterDebut = debut ? dateDebutContrat >= debut : true;
      const isBeforeFin = fin ? dateFinContrat <= fin : true;

      return isAfterDebut && isBeforeFin;
    });

    if (this.filterStatut) {
      filtered = filtered.filter(contrat => contrat.statut === this.filterStatut);
    }

    this.filteredContrats = filtered;
    this.p = 1; // Réinitialiser la page à 1 après filtration
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
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le contrat #${contrat.numeroContrat} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteContrat(contrat);
      }
    });
  }

  closePopup(): void {
    this.showPopup = false;
    this.contratToDelete = null;
  }

  deleteContrat(contrat: Contrat): void {
    if (contrat && contrat.id) {
      this.contratService.deleteContrat(contrat.id).subscribe(() => {
        this.contrats = this.contrats.filter(c => c.id !== contrat.id);
        this.filteredContrats = this.filteredContrats.filter(c => c.id !== contrat.id);
        this.closePopup();
      });
    }
  }

  payContrat(contratId: number): void {
    const contrat = this.contrats.find(c => c.id === contratId);
    
    if (contrat && (contrat.statut === 'InProgress' || contrat.statut === 'PaymentPending')) {
      if (contrat.statut === 'InProgress') {
        contrat.statut = StatutContrat.PaymentPending;
        this.contratService.updateContrat(contratId, contrat).subscribe(
          () => {
            console.log(`✅ Statut du contrat ${contratId} mis à jour à PaymentPending`);
            this.redirectToFacture(contratId);
          },
          error => {
            console.error('❌ Erreur lors de la mise à jour du statut:', error);
          }
        );
      } else {
        this.redirectToFacture(contratId);
      }
    } else {
      console.warn('Le contrat doit être en statut InProgress ou PaymentPending');
    }
  }

  private redirectToFacture(contratId: number): void {
    this.router.navigate(['/factureclient', contratId]);
  }

  viewContrat(contratId: number): void {
    this.router.navigate([`/contrat/${contratId}`]);
  }

  editContrat(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Modifier le contrat',
        text: 'Voulez-vous modifier ce contrat ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Oui, modifier',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/contrat-form2', id]);
        }
      });
    } else {
      Swal.fire('Erreur', 'Contrat ID est indéfini', 'error');
    }
  }

  getTimelineSteps(contrat: Contrat): { label: string; completed: boolean; active: boolean }[] {
    return [
      { label: 'En cours', completed: contrat.statut === 'InProgress' || contrat.statut === 'PaymentPending' || contrat.statut === 'ACTIVE', active: contrat.statut === 'InProgress' },
      { label: 'Paiement', completed: contrat.statut === 'PaymentPending' || contrat.statut === 'ACTIVE', active: contrat.statut === 'PaymentPending' },
      { label: 'Actif', completed: contrat.statut === 'ACTIVE', active: contrat.statut === 'ACTIVE' }
    ];
  }
}