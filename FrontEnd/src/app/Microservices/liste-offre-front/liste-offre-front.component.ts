import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { debounceTime } from 'rxjs/operators';
import { ReservationService } from 'src/app/services/ReservationService';
import { MatDialog } from '@angular/material/dialog';
import { ReservationCalendarComponent } from 'src/app/reservation-calendar/reservation-calendar.component';
import { MapOffresComponent } from 'src/app/map-offres/map-offres.component';
import { GeocodingService } from 'src/app/services/geocoding.service';

@Component({
  selector: 'app-liste-offre-front',
  templateUrl: './liste-offre-front.component.html',
  styleUrls: ['./liste-offre-front.component.css']
})
export class ListeOffreFrontComponent implements OnInit {
  offres: any[] = [];
  filteredOffres: any[] = [];
  page: number = 1;
  itemsPerPage: number = 9;
  showStatsModal = false;

  typesAssurance: string[] = [
    'Assurance automobile',
    'Assurance scolaire',
    'Assurance voyage',
    'Assurance santé',
    'Assurance habitation'
  ];

  searchLocalisation = new FormControl('');
  searchTypeAssurance = new FormControl('');

  constructor(
    private offreService: OffrePartenaireService,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private geocodingService: GeocodingService
  ) {}

  ngOnInit(): void {
    this.getAllOffres();
    this.searchLocalisation.valueChanges.pipe(debounceTime(300)).subscribe(() => this.applyFilters());
    this.searchTypeAssurance.valueChanges.pipe(debounceTime(300)).subscribe(() => this.applyFilters());
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data) => {
        this.offres = data;
        this.filteredOffres = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    );
  }

  applyFilters(): void {
    const localisation = this.searchLocalisation.value?.toLowerCase() || '';
    const typeAssurance = this.searchTypeAssurance.value?.toLowerCase() || '';

    this.filteredOffres = this.offres.filter(offre =>
      offre.localisation.toLowerCase().includes(localisation) &&
      offre.typeOffre.toLowerCase().includes(typeAssurance)
    );
  }

  reserverOffre(offreId: number): void {
    const dateLimite = new Date(this.offres.find(offre => offre.id === offreId).dateFin);

    const dialogRef = this.dialog.open(ReservationCalendarComponent, {
      width: '400px',
      data: { dateLimite: dateLimite }
    });

    dialogRef.afterClosed().subscribe((selectedDate: Date) => {
      if (selectedDate) {
        const userId = 2; // À remplacer par l'ID réel de l'utilisateur
        const reservation = { dateReservation: selectedDate };

        this.reservationService.createReservation(userId, offreId, reservation).subscribe(
          (response) => {
            console.log('Réservation créée avec succès', response);
            alert('Réservation réussie !');
          },
          (error) => {
            console.error('Erreur lors de la création de la réservation', error);
            alert('Erreur lors de la réservation. Veuillez réessayer.');
          }
        );
      }
    });
  }

  openMap(): void {
    const dialogRef = this.dialog.open(MapOffresComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-modal',
      data: { offres: this.filteredOffres }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La carte a été fermée');
    });
  }

  toggleStatsModal() {
    this.showStatsModal = !this.showStatsModal;
    document.body.style.overflow = this.showStatsModal ? 'hidden' : '';
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.showStatsModal) {
      this.toggleStatsModal();
    }
  }
}
