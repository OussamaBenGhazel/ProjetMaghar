import { Component, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-rotatedmarker';

@Component({
  selector: 'app-map-offres',
  templateUrl: './map-offres.component.html',
  styleUrls: ['./map-offres.component.css']
})
export class MapOffresComponent implements AfterViewInit {
  offres: any[] = [];
  private map: any;
  private routingControl: any;
  private carMarker: L.Marker | null = null;
  private routeCoords: L.LatLng[] = [];
  private carSpeed: number = 0.0001;
  private currentPointIndex: number = 0;
  private lastUpdateTime: number = 0;
  private markers: L.Marker[] = [];
  private currentFilter: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.offres = data.offres;
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [36.8065, 10.1815], // Centre sur Tunis par défaut
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajouter le contrôle de localisation
    (L as any).control.locate({
      position: 'topright',
      drawCircle: true,
      follow: true,
      setView: true,
      keepCurrentZoomLevel: true,
      markerStyle: {
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8
      },
      circleStyle: {
        weight: 1,
        clickable: false
      },
      icon: 'fa fa-map-marker',
      metric: true,
      strings: {
        title: "Ma position",
        popup: "Vous êtes à {distance} {unit} de ce point",
        outsideMapBoundsMsg: "Vous semblez être en dehors de la zone de la carte"
      },
      locateOptions: {
        maxZoom: 16,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.clearMarkers();

    if (this.offres.length === 0) {
      this.map.setView([36.8065, 10.1815], 12); // Re-centrer sur Tunis si pas de résultats
      return;
    }

    // Calculer les limites pour fitBounds
    const markerBounds = L.latLngBounds([]);

    this.offres.forEach(offre => {
      if (offre.partenaire && offre.partenaire.latitude && offre.partenaire.longitude) {
        const latLng = L.latLng(offre.partenaire.latitude, offre.partenaire.longitude);
        markerBounds.extend(latLng);

        const marker = L.marker([offre.partenaire.latitude, offre.partenaire.longitude], {
          icon: this.getMarkerIcon(offre.typeOffre),
        }).addTo(this.map);

        this.markers.push(marker);

        marker.on('click', () => {
          this.addRouteToPartner(offre.partenaire.latitude, offre.partenaire.longitude);
        });

        marker.bindPopup(
          `<div class="custom-popup">
            <h3>${offre.typeOffre}</h3>
            <p>📍 Localisation : ${offre.localisation}</p>
            <p>🏢 Partenaire : ${offre.partenaire.nom}</p>
            <p>📅 Expiration : ${new Date(offre.dateExpiration).toLocaleDateString()}</p>
            <p>💰 Prix : ${offre.prix} TND</p>
            <p>ℹ️ Description : ${offre.description}</p>
            <p>👥 Places disponibles : ${offre.placesDisponibles}</p>
            <div class="popup-buttons">
              <a href="/offre/${offre.id}" class="btn-popup">📄 Voir les détails</a>
              <a href="${this.getDirectionsLink(offre.partenaire.latitude, offre.partenaire.longitude)}"
                 class="btn-popup secondary" target="_blank">📍 Itinéraire</a>
            </div>
          </div>`,
          { className: 'animated-popup', maxWidth: 300 }
        );
      }
    });

    // Ajuster la vue pour afficher tous les marqueurs
    this.map.fitBounds(markerBounds, { padding: [50, 50] });
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }

    if (this.carMarker) {
      this.map.removeLayer(this.carMarker);
      this.carMarker = null;
    }
  }

  private getMarkerIcon(typeOffre: string): L.Icon {
    let iconUrl = 'assets/images/map7.gif';

    // Vous pouvez personnaliser les icônes par type d'offre
    switch(typeOffre.toLowerCase()) {
      case 'assurance habitation':
        break;
      case 'assurance santé':
        break;
      case 'assurance voyage':
        break;
      case 'assurance scolaire':
        break;
    }

    return L.icon({
      iconUrl: iconUrl,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  }

  private getDirectionsLink(lat: number, lng: number): string {
    return `https://www.openstreetmap.org/directions?from=&to=${lat},${lng}`;
  }

  private addRouteToPartner(partnerLat: number, partnerLng: number): void {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    if (this.carMarker) {
      this.map.removeLayer(this.carMarker);
      this.carMarker = null;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      this.routingControl = (L as any).Routing.control({
        waypoints: [
          L.latLng(userLat, userLng),
          L.latLng(partnerLat, partnerLng)
        ],
        routeWhileDragging: true,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        createMarker: () => null
      }).addTo(this.map);

      this.routingControl.on('routesfound', (event: any) => {
        this.routeCoords = event.routes[0].coordinates;

        this.carMarker = L.marker([userLat, userLng], {
          icon: L.icon({
            iconUrl: 'assets/images/car-icon.png',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          }),
          rotationAngle: 0,
          rotationOrigin: 'center center'
        }).addTo(this.map);

        this.moveCarAlongRoute();
      });

    }, error => {
      console.error("Erreur de géolocalisation :", error);
      alert("Impossible d'obtenir votre position. Veuillez activer la géolocalisation.");
    });
  }

  private moveCarAlongRoute(): void {
    const routeLength = this.routeCoords.length;
    let currentProgress = 0;
    const moveStep = (timestamp: number) => {
      if (!this.lastUpdateTime) this.lastUpdateTime = timestamp;
      const deltaTime = timestamp - this.lastUpdateTime;
      this.lastUpdateTime = timestamp;

      if (this.carMarker && currentProgress < 1) {
        const startIdx = Math.floor(currentProgress * (routeLength - 1));
        const endIdx = startIdx + 1;

        if (endIdx >= routeLength) return;

        const start = this.routeCoords[startIdx];
        const end = this.routeCoords[endIdx];

        const progressBetweenPoints = (currentProgress * (routeLength - 1)) % 1;
        const lat = start.lat + (end.lat - start.lat) * progressBetweenPoints;
        const lng = start.lng + (end.lng - start.lng) * progressBetweenPoints;

        this.carMarker.setLatLng([lat, lng]);

        // Calculer l'angle de rotation
        if (endIdx < routeLength - 1) {
          const nextPoint = this.routeCoords[endIdx + 1];
          const angle = Math.atan2(nextPoint.lng - end.lng, nextPoint.lat - end.lat) * 180 / Math.PI;
          (this.carMarker as any).setRotationAngle(angle);
        }

        currentProgress += this.carSpeed * (deltaTime / 16); // Normaliser par rapport au temps
        requestAnimationFrame(moveStep);
      }
    };

    requestAnimationFrame(moveStep);
  }

  filterByType(type: string): void {
    this.currentFilter = type;
    this.offres = this.data.offres.filter((offre: any) =>
      offre.typeOffre.toLowerCase() === type.toLowerCase()
    );
    this.addMarkers();
  }

  resetFilters(): void {
    this.currentFilter = null;
    this.offres = [...this.data.offres];
    this.addMarkers();
  }
}
