import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreEmploiService } from '../services/offre-emploi.service'; // Importer le service
import { OffreEmploi } from '../models/offre-emploi';  // Assurez-vous d'importer correctement le modèle
import * as L from 'leaflet'; // Importation de Leaflet

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  offre: OffreEmploi | undefined;

  constructor(
    private route: ActivatedRoute,
    private offreEmploiService: OffreEmploiService // Injection du service
  ) { }

  ngOnInit(): void {
    const offreId = Number(this.route.snapshot.paramMap.get('id'));  // Récupérer l'ID de l'offre depuis l'URL
    this.getOffreDetail(offreId);
    const map = L.map('map').setView([36.8065, 10.1815], 13);  // Localisation de Maghrebia Assurances

    // Ajout d'un fond de carte à l'aide de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Ajout d'un marqueur à la position de Maghrebia Assurances
    L.marker([36.8065, 10.1815]).addTo(map).bindPopup('Maghrebia Assurances').openPopup();
  }
  

  // Méthode pour récupérer les détails de l'offre via le service
  getOffreDetail(id: number): void {
    this.offreEmploiService.getOffreById(id).subscribe(
      (offre) => {
        this.offre = offre; // Récupérer les détails de l'offre
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'offre:', error);
      }
    );
  }
}
