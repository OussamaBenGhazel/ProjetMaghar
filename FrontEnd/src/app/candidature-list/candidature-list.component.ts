import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../services/candidature.service';
import { Candidature } from '../models/candidature.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-candidature-list',
  templateUrl: './candidature-list.component.html',
  styleUrls: ['./candidature-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CandidatureListComponent implements OnInit {
  candidatures: Candidature[] = [];
  filteredCandidatures: Candidature[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 3; // Aligné avec les offres (3 par page)
  searchTerm: string = '';
  statusFilter: string = ''; // Filtre par statut

  isEditMode: boolean = false;
  editForm: FormGroup;
  selectedCandidature: Candidature | null = null;

  private apiUrl = 'http://localhost:8085/inesk/candidatures'; // URL de ton API

  constructor(
    private candidatureService: CandidatureService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nom: [''],
      email: [''],
      lettreMotivation: [''],
      statut: ['']
    });
  }

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures(): void {
    this.isLoading = true;
    this.candidatureService.getAllCandidaturesWithOffre().subscribe(
      (data) => {
        this.candidatures = data.map(candidature => ({
          ...candidature,
          offreEmploi: candidature.offreEmploi || {
            id: 0,
            titre: 'Non spécifié',
            description: 'Non disponible',
            categorie: 'Non renseignée',
            localisation: 'Non renseignée',
            salaireMin: 'Non renseigné',
            salaireMax: 'Non renseigné',
            typeContrat: 'Non renseigné',
            competencesRequises: 'Non renseignées'
          }
        }));
        this.filteredCandidatures = this.candidatures; // Initialisation de la liste filtrée
        console.log('Candidatures chargées :', this.candidatures);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des candidatures';
        this.isLoading = false;
        console.error('Erreur :', error);
      }
    );
  }

  // Filtrer les candidatures
  filterCandidatures(): void {
    let filtered = this.candidatures;

    // Filtrer par statut
    if (this.statusFilter) {
      filtered = filtered.filter(candidature =>
        candidature.statut.toLowerCase() === this.statusFilter.toLowerCase()
      );
    }

    // Filtrer par recherche textuelle
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(candidature =>
        candidature.nom.toLowerCase().includes(term) ||
        candidature.email.toLowerCase().includes(term) ||
        (candidature.offreEmploi?.titre && candidature.offreEmploi.titre.toLowerCase().includes(term))
      );
    }

    this.filteredCandidatures = filtered;
  }

  // Appelé lors du changement de searchTerm
  onSearchTermChange(): void {
    this.page = 1; // Réinitialiser la page lors d'un nouveau filtrage
    this.filterCandidatures();
  }

  // Appelé lors du changement de statusFilter
  onStatusFilterChange(): void {
    this.page = 1; // Réinitialiser la page lors d'un nouveau filtrage
    this.filterCandidatures();
  }

  parseAnalyseResult(analyseResult?: string): any {
    if (!analyseResult) return { skills_found: [], experience_years: 0, meets_criteria: false, score: 0 };
    try {
      return JSON.parse(analyseResult);
    } catch (e) {
      console.error('Erreur lors du parsing de analyseResult :', e);
      return { skills_found: [], experience_years: 0, meets_criteria: false, score: 0 };
    }
  }

  getDownloadCvUrl(candidatureId: number): string {
    return `${this.apiUrl}/download-cv/${candidatureId}`;
  }

  onEdit(candidature: Candidature): void {
    this.isEditMode = true;
    this.selectedCandidature = candidature;
    this.editForm.patchValue({
      nom: candidature.nom,
      email: candidature.email,
      lettreMotivation: candidature.lettreMotivation,
      statut: candidature.statut
    });
  }

  onSave(): void {
    if (this.editForm.valid && this.selectedCandidature) {
      const updatedCandidature = {
        ...this.selectedCandidature,
        ...this.editForm.value
      };
      this.candidatureService.updateCandidature(this.selectedCandidature.id, updatedCandidature).subscribe(
        (response) => {
          console.log('Candidature mise à jour:', response);
          this.loadCandidatures();
          this.onCancelEdit();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la candidature:', error);
        }
      );
    }
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.selectedCandidature = null;
    this.editForm.reset();
  }

  supprimerCandidature(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      this.candidatureService.deleteCandidature(id).subscribe(
        () => {
          console.log('Candidature supprimée:', id);
          this.loadCandidatures();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la candidature:', error);
        }
      );
    }
  }
}