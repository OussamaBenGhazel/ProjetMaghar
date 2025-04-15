<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { debounceTime } from 'rxjs/operators';
=======
import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { debounceTime } from 'rxjs/operators';
import { ReservationService } from 'src/app/services/ReservationService';
import { MatDialog } from '@angular/material/dialog';
import { ReservationCalendarComponent } from 'src/app/reservation-calendar/reservation-calendar.component';
import { MapOffresComponent } from 'src/app/map-offres/map-offres.component';
import { GeocodingService } from 'src/app/services/geocoding.service';
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8

@Component({
  selector: 'app-liste-offre-front',
  templateUrl: './liste-offre-front.component.html',
  styleUrls: ['./liste-offre-front.component.css']
})
export class ListeOffreFrontComponent implements OnInit {
  offres: any[] = [];
  filteredOffres: any[] = [];
  page: number = 1;
<<<<<<< HEAD
  itemsPerPage: number = 5;

  // Déclaration des FormControl pour les champs de recherche
  searchLocalisation = new FormControl('');
  searchPartenaire = new FormControl('');
  searchTypeAssurance = new FormControl('');

  constructor(private offreService: OffrePartenaireService) {}

  ngOnInit(): void {
    this.getAllOffres();

    // Écoute des changements sur les champs de recherche pour un filtrage en temps réel
    this.searchLocalisation.valueChanges.pipe(debounceTime(300)).subscribe(() => this.applyFilters());
    this.searchPartenaire.valueChanges.pipe(debounceTime(300)).subscribe(() => this.applyFilters());
=======
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
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
    this.searchTypeAssurance.valueChanges.pipe(debounceTime(300)).subscribe(() => this.applyFilters());
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data) => {
        this.offres = data;
<<<<<<< HEAD
        this.filteredOffres = data; // Initialement, toutes les offres sont affichées
=======
        this.filteredOffres = data;
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    );
  }

  applyFilters(): void {
    const localisation = this.searchLocalisation.value?.toLowerCase() || '';
<<<<<<< HEAD
    const partenaire = this.searchPartenaire.value?.toLowerCase() || '';
=======
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
    const typeAssurance = this.searchTypeAssurance.value?.toLowerCase() || '';

    this.filteredOffres = this.offres.filter(offre =>
      offre.localisation.toLowerCase().includes(localisation) &&
<<<<<<< HEAD
      offre.partenaire?.nom.toLowerCase().includes(partenaire) &&
      offre.typeOffre.toLowerCase().includes(typeAssurance)
    );
  }
=======
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
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
}
