import { Component, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker'; // Importer le plugin pour la rotation des marqueurs
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/ReservationService';
import { ReservationCalendarComponent } from 'src/app/reservation-calendar/reservation-calendar.component';
@Component({
  selector: 'app-map-offres',
  templateUrl: './map-offres.component.html',
  styleUrls: ['./map-offres.component.css']
})
export class MapOffresComponent implements AfterViewInit {
  offres: any[] = [];
  private map: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.offres = data.offres; // Récupérez les offres passées depuis la modale

  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    // Initialisation de la carte avec une vue centrée sur Paris
    this.map = L.map('map', {
      center: [48.8566, 2.3522], // Centre de la carte
      zoom: 10, // Niveau de zoom initial
    });

    // Ajout d'une couche de tuiles (tiles) OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.offres.forEach(offre => {
      if (offre.partenaire && offre.partenaire.latitude && offre.partenaire.longitude) {
        const marker = L.marker([offre.partenaire.latitude, offre.partenaire.longitude], {
          icon: this.getMarkerIcon(offre.typeOffre), // Utiliser l'icône personnalisée
        }).addTo(this.map);

        marker.on('click', () => {
          marker.setLatLng([offre.partenaire.latitude + 0.0005, offre.partenaire.longitude]);
          setTimeout(() => {
            marker.setLatLng([offre.partenaire.latitude, offre.partenaire.longitude]);
          }, 300);
        });

        // Ajout d'une popup avec les détails de l'offre
        marker.bindPopup(`
          <div class="custom-popup">
            <div class="popup-header">
              <h3>${offre.typeOffre}</h3>
            </div>
            <p><i class="fas fa-map-marker-alt"></i> Localisation : ${offre.localisation}</p>
            <p><i class="fas fa-building"></i> Partenaire : ${offre.partenaire.nom}</p>
            <p><i class="fas fa-calendar-alt"></i> Date d'expiration : ${offre.dateExpiration}</p>
            <p><i class="fas fa-tag"></i> Prix : ${offre.prix} TND</p>
            <p><i class="fas fa-info-circle"></i> Description : ${offre.description}</p>
            <p><i class="fas fa-users"></i> Nombre de places disponibles : ${offre.placesDisponibles}</p>
            <div class="popup-buttons">
              <a href="/offre/${offre.id}" class="btn-popup">📄 Voir les détails</a>
              <a href="${this.getDirectionsLink(offre.partenaire.latitude, offre.partenaire.longitude)}" class="btn-popup secondary" target="_blank">📍 Itinéraire</a>
              <!-- Ajout du bouton de réservation -->
              <a href="javascript:void(0);" class="btn-popup reserve-btn" (click)="reserveOffre(offre)">🔒 Réserver</a>
            </div>
          </div>
        `, { className: 'animated-popup' });


        // Animation de rotation du marqueur
        setInterval(() => {
          const currentAngle = marker.options.rotationAngle || 0;
          marker.setRotationAngle(currentAngle + 0);
        }, 0);
      } else {
        console.warn(`Offre ${offre.id} sans partenaire valide.`);
      }
    });
  }

  private getMarkerIcon(typeOffre: string): L.Icon {
    let iconUrl: string;
    let iconSize: [number, number];
    let iconAnchor: [number, number];

    switch (typeOffre) {
      case 'Assurance automobile':
        iconUrl = 'assets/icons/car.png'; // Icône pour l'assurance automobile
        iconSize = [30, 30];
        iconAnchor = [15, 15];
        break;
      case 'Assurance scolaire':
        iconUrl = 'assets/images/school.png'; // Icône pour l'assurance scolaire
        iconSize = [25, 25];
        iconAnchor = [12, 12];
        break;
      case 'Assurance voyage':
        iconUrl = 'assets/images/travel.png'; // Icône pour l'assurance voyage
        iconSize = [35, 35];
        iconAnchor = [17, 17];
        break;
      default:
        iconUrl = 'assets/images/map7.gif'; // Icône par défaut
        iconSize = [25, 25];
        iconAnchor = [12, 12];
    }

    return L.icon({
      iconUrl: 'assets/images/map7.gif', // Remplace par ton icône rouge
      iconSize: [50, 60], // Taille du marqueur
      iconAnchor: [15, 40], // Point d'ancrage
      popupAnchor: [0, -35], // Position de la popup
    });
  }

  private getDirectionsLink(lat: number, lng: number): string {
    return `https://www.openstreetmap.org/directions?from=&to=${lat},${lng}`;
  }

  // Méthode pour gérer la réservation de l'offre
  reserveOffre(offre: any): void {
    // Afficher un message de confirmation ou effectuer une action liée à la réservation
    alert(`Vous avez réservé l'offre: ${offre.typeOffre} avec le partenaire ${offre.partenaire.nom}`);
    // Si tu veux rediriger l'utilisateur vers une page de réservation, tu peux utiliser le routeur Angular
    // this.router.navigate(['/reservation', offre.id]);
  }
}
