import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-liste-offre-front',
  templateUrl: './liste-offre-front.component.html',
  styleUrls: ['./liste-offre-front.component.css']
})
export class ListeOffreFrontComponent implements OnInit {
  offres: any[] = [];
  filteredOffres: any[] = [];
  page: number = 1;
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
    this.searchTypeAssurance.valueChanges.pipe(debounceTime(300)).subscribe(() => this.applyFilters());
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      (data) => {
        this.offres = data;
        this.filteredOffres = data; // Initialement, toutes les offres sont affichées
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    );
  }

  applyFilters(): void {
    const localisation = this.searchLocalisation.value?.toLowerCase() || '';
    const partenaire = this.searchPartenaire.value?.toLowerCase() || '';
    const typeAssurance = this.searchTypeAssurance.value?.toLowerCase() || '';

    this.filteredOffres = this.offres.filter(offre =>
      offre.localisation.toLowerCase().includes(localisation) &&
      offre.partenaire?.nom.toLowerCase().includes(partenaire) &&
      offre.typeOffre.toLowerCase().includes(typeAssurance)
    );
  }
}
