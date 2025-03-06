import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { debounceTime } from 'rxjs/operators';
import { ReservationService } from 'src/app/services/ReservationService';
import { MatDialog } from '@angular/material/dialog'; // Importez MatDialog
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
    private dialog: MatDialog, // Injectez MatDialog,
    private geocodingService: GeocodingService // Injectez le service de géocodage

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

  // Méthode pour réserver une offre
  reserverOffre(offreId: number): void {
    const dateLimite = new Date(this.offres.find(offre => offre.id === offreId).dateFin);

    // Ouvrir la modale avec le calendrier
    const dialogRef = this.dialog.open(ReservationCalendarComponent, {
      width: '400px', // Taille de la modale
      data: { dateLimite: dateLimite } // Passer la date limite au calendrier
    });

    // Écouter la fermeture de la modale
    dialogRef.afterClosed().subscribe((selectedDate: Date) => {
      if (selectedDate) {
        const userId = 2; // Remplacez par l'ID de l'utilisateur connecté
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

  // Méthode pour ouvrir la carte des offres
  openMap(): void {
    const dialogRef = this.dialog.open(MapOffresComponent, {
      width: '100vw', // Largeur de la modale en plein écran
      height: '100vh', // Hauteur de la modale en plein écran
      maxWidth: '100vw', // Largeur maximale
      maxHeight: '100vh', // Hauteur maximale
      panelClass: 'full-screen-modal', // Classe CSS pour le style en plein écran
      data: { offres: this.filteredOffres } // Passez les offres filtrées à la carte
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La carte a été fermée');
    });
  }
}
