import { Component, OnInit } from '@angular/core';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';
import { ChartConfiguration, ChartData } from 'chart.js';
import { typesAssurance } from 'src/app/core/models/assurance.model';

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

  // Configuration des histogrammes
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Catégories' } },
      y: { min: 0, title: { display: true, text: 'Valeurs' } }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };
  public barChartType = 'bar' as const; // Définir comme littéral 'bar'

  // Données pour histogramme : Répartition par statut
  public statutChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  // Données pour histogramme : Prime moyenne par type d'assurance
  public primeChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  constructor(
    private contratService: ContratService,
    private assuranceService: AssuranceService
  ) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getAllContrats().subscribe({
      next: (data: Contrat[]) => {
        this.contrats = data.map(c => ({
          ...c,
          dateDebut: new Date(c.dateDebut),
          dateFin: new Date(c.dateFin)
        }));
        this.isLoading = false;
        this.loadAssurancesAndUpdateCharts();
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des contrats:', error);
        this.errorMessage = "Erreur lors du chargement des contrats.";
        this.isLoading = false;
      }
    });
  }

  loadAssurancesAndUpdateCharts(): void {
    this.assuranceService.getAllAssurances().subscribe({
      next: (assurances) => {
        this.contrats.forEach(contrat => {
          contrat.assurance = assurances.find(a => a.id === contrat.assuranceId);
        });
        this.updateStatutChart();
        this.updatePrimeChart();
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des assurances:', error);
      }
    });
  }

  updateStatutChart(): void {
    const statutCounts = this.contrats.reduce((acc, contrat) => {
      acc[contrat.statut] = (acc[contrat.statut] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.statutChartData = {
      labels: Object.keys(statutCounts),
      datasets: [{
        data: Object.values(statutCounts),
        label: 'Nombre de contrats',
        backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6c757d'],
        borderColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6c757d'],
        borderWidth: 1
      }]
    };
  }

  updatePrimeChart(): void {
    // Initialisation de tous les types d'assurance
    const primeByType: { [key: string]: { totalPrime: number; count: number } } = {};
  
    // Initialisation des types d'assurance à 0
    Object.values(typesAssurance).forEach(type => {
      primeByType[type] = { totalPrime: 0, count: 0 };
    });
  
    // Calcul des primes par type
    this.contrats.forEach(contrat => {
      const type = contrat.assurance?.type;
      if (type && primeByType[type]) {
        primeByType[type].totalPrime += contrat.prime || 0;
        primeByType[type].count += 1;
      }
    });
  
    // Génération des labels et calcul des moyennes
    const labels = Object.keys(primeByType);
    const averages = labels.map(type =>
      primeByType[type].count > 0 ? primeByType[type].totalPrime / primeByType[type].count : 0
    );
  
    // Mise à jour des données du graphique
    this.primeChartData = {
      labels: labels,
      datasets: [{
        data: averages,
        label: 'Prime moyenne (DT)',
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1
      }]
    };
  }
  

  viewDetails(id: number | undefined): void {
    if (id !== undefined) {
      console.log(`Voir les détails du contrat ${id}`);
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
      this.contratService.deleteContrat(this.contratToDelete.id).subscribe({
        next: () => {
          this.contrats = this.contrats.filter(c => c.id !== this.contratToDelete!.id);
          console.log(`✅ Contrat ${this.contratToDelete!.id} supprimé`);
          this.closePopup();
          this.updateStatutChart();
          this.updatePrimeChart();
        },
        error: (error) => {
          console.error('❌ Erreur lors de la suppression du contrat:', error);
          this.closePopup();
        }
      });
    }
  }

  getTimelineSteps(contrat: Contrat): { label: string; completed: boolean; active: boolean }[] {
    return [
      { label: 'En cours', completed: true, active: contrat.statut === 'InProgress' },
      { label: 'Paiement', completed: contrat.statut === 'PaymentPending' || contrat.statut === 'ACTIVE', active: contrat.statut === 'PaymentPending' },
      { label: 'Actif', completed: contrat.statut === 'ACTIVE', active: contrat.statut === 'ACTIVE' }
    ];
  }
}