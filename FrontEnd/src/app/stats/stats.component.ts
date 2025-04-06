import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiStatsService } from '../services/api-stats.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {
  @Input() isModal = false;
  public isFullscreen = false;
  public isLoading = true;
  public currentChartIndex = 0;
  public charts = ['bar', 'pie'];
  private destroy$ = new Subject<void>();

  public allInsuranceTypes: string[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Réservations par type',
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Réservations par mois',
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ]
    }]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} réservation${context.raw !== 1 ? 's' : ''}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  constructor(
    private statsService: ApiStatsService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.isFullscreen = navigation?.extras.state?.['fullscreen'] || false;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public refreshData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.statsService.getAllInsuranceTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (types) => {
          this.allInsuranceTypes = types;
          this.initializeCharts();
          this.loadStats();
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.useDefaultData();
        }
      });
  }

  private initializeCharts(): void {
    this.barChartData = {
      labels: this.allInsuranceTypes,
      datasets: [{
        ...this.barChartData.datasets[0],
        data: new Array(this.allInsuranceTypes.length).fill(0)
      }]
    };
  }

  private loadStats(): void {
    this.statsService.getOfferStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Données reçues du backend:', data);

          // Normalisation des clés pour éviter les problèmes de casse/espaces
          const normalizedData = this.normalizeDataKeys(data);

          this.barChartData.datasets[0].data = this.allInsuranceTypes.map(type => {
            const normalizedType = type.trim().toLowerCase();
            return normalizedData[normalizedType] || 0;
          });

          this.loadMonthlyStats();
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.barChartData.datasets[0].data = new Array(this.allInsuranceTypes.length).fill(0);
        }
      });
  }

  private normalizeDataKeys(data: { [key: string]: number }): { [key: string]: number } {
    const normalized: { [key: string]: number } = {};
    Object.keys(data).forEach(key => {
      normalized[key.trim().toLowerCase()] = data[key];
    });
    return normalized;
  }

  private loadMonthlyStats(): void {
    this.statsService.getMonthlyStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.pieChartData = {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              label: 'Réservations par mois',
              backgroundColor: this.pieChartData.datasets[0].backgroundColor
            }]
          };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.isLoading = false;
        }
      });
  }

  private useDefaultData(): void {
    this.allInsuranceTypes = [
      'Assurance automobile',
      'Assurance Santé',
      'Assurance Voyage',
      'Assurance Habitation',
      'Assurance scolaire'
    ];
    this.initializeCharts();
    this.barChartData.datasets[0].data = [15, 10, 5, 0, 5];
    this.pieChartData = {
      labels: ['Janvier', 'Février', 'Mars'],
      datasets: [{
        data: [10, 15, 8],
        label: 'Réservations par mois',
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ]
      }]
    };
    this.isLoading = false;
  }

  nextChart(): void {
    if (this.currentChartIndex < this.charts.length - 1) {
      this.currentChartIndex++;
    }
  }

  prevChart(): void {
    if (this.currentChartIndex > 0) {
      this.currentChartIndex--;
    }
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
    document.body.style.overflow = this.isFullscreen ? 'hidden' : '';
  }

  close(): void {
    this.currentChartIndex = 0;
    if (this.isFullscreen) {
      this.location.back();
    } else {
      this.router.navigate(['/NosOffres']);
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isFullscreen) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isFullscreen && target.classList.contains('stats-overlay')) {
      this.close();
    }
  }
}
