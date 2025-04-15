import { Component, OnInit } from '@angular/core';
import { OffreConsultationService } from '../services/offre-consultation.service';
import { OffreEmploi } from '../models/offre-emploi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nos-offres',
  templateUrl: './nos-offres.component.html',
  styleUrls: ['./nos-offres.component.css']
})
export class NosOffresComponent implements OnInit {
  offres: OffreEmploi[] = [];
  p: number = 1;
  filteredOffres: OffreEmploi[] = [];
  searchTerm: string = '';

  constructor(
    private offreConsultationService: OffreConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offreConsultationService.getAllOffresEmploi().subscribe((data: OffreEmploi[]) => {
      console.log('Offres récupérées :', data);
      data.forEach(offre => console.log(`Offre ID: ${offre.id}, Titre: ${offre.titre}, Candidatures: ${offre.nombreCandidatures}`));
      this.offres = data;
      this.filteredOffres = data;
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredOffres = this.offres;
    } else {
      this.filteredOffres = this.offres.filter(offre =>
        offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        offre.categorie.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        offre.localisation.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  postuler(offreId: number): void {
    console.log('Navigation vers postuler avec ID :', offreId);
    this.router.navigate(['/postuler', offreId]);
  }

  openDetails(offreId: number): void {
    this.router.navigate(['/offre-detail', offreId]);
  }
}