import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Assurance } from 'src/app/core/models/assurance.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';

@Component({
  selector: 'app-listassuranceclient',
  templateUrl: './listassuranceclient.component.html',
  styleUrls: ['./listassuranceclient.component.css']
})
export class ListassuranceclientComponent implements OnInit {
  assurances: Assurance[] = []; // Liste complète des assurances
  originalAssurances: Assurance[] = []; // Sauvegarde de toutes les assurances non filtrées
  typeFiltre: string = '';
  searchQuery: string = ''; // Nouvelle propriété pour la recherche
  p: number = 1; // Page actuelle pour la pagination
  itemsPerPage: number = 6; // Nombre d'éléments par page

  constructor(
    private assuranceService: AssuranceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Écouter les changements de paramètres d'URL
    this.route.queryParams.subscribe(params => {
      const type = params['type'] || '';
      this.typeFiltre = type;
      this.loadAssurances(type);
    });
  }

  loadAssurances(type: string = ''): void {
    if (type) {
      // Charger les assurances filtrées par type
      this.assuranceService.getAssurancesByType(type).subscribe((data: Assurance[]) => {
        this.assurances = data;
        this.originalAssurances = [...data]; // Sauvegarder les assurances filtrées par type
        this.filterAssurances(); // Appliquer la recherche après chargement
      });
    } else {
      // Charger toutes les assurances
      this.assuranceService.getAllAssurances().subscribe((data: Assurance[]) => {
        this.assurances = data;
        this.originalAssurances = [...data]; // Sauvegarder toutes les assurances
        this.filterAssurances(); // Appliquer la recherche après chargement
      });
    }
  }

  // Méthode pour filtrer les assurances en fonction de la recherche
  filterAssurances(): void {
    if (!this.searchQuery) {
      // Si la recherche est vide, réinitialiser avec les assurances originales
      this.assurances = [...this.originalAssurances];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.assurances = this.originalAssurances.filter(assurance => 
      assurance.nom.toLowerCase().includes(query) ||
      assurance.description?.toLowerCase().includes(query) ||
      assurance.type.toLowerCase().includes(query) ||
      assurance.montantAssure?.toString().includes(query) ||
      assurance.prime.toString().includes(query)
    );
  }

  // Redirection vers le formulaire de souscription avec l'ID de l'assurance
  subscribeToAssurance(assuranceId: number): void {
    if (assuranceId) {
      this.router.navigate(['/contrat-form', assuranceId]);
    } else {
      console.error('Assurance ID is undefined');
    }
  }

  navigateToAddAssurance(): void {
    this.router.navigate(['/admin/assurance-form']);
  }
}