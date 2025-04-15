import { Component, OnInit } from '@angular/core';
import { OffreEmploiService } from '../../services/offre-emploi.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { OffreEmploi } from '../../models/offre-emploi';

@Component({
  selector: 'app-list-offres-emploi',
  templateUrl: './liste-offres-emploi.component.html',
  styleUrls: ['./liste-offres-emploi.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ListOffresEmploiComponent implements OnInit {
  offres: OffreEmploi[] = [];
  isEditMode: boolean = false;
  offreEnCours: OffreEmploi | null = null;
  editForm: FormGroup;
  page: number = 1;
  pageSize: number = 6;
  searchTerm: string = '';

  constructor(private offreEmploiService: OffreEmploiService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [null],
      titre: [''],
      categorie: [''],
      localisation: [''],
      salaireMin: [''],
      salaireMax: [''],
      typeContrat: [''],
      competencesRequises: ['']
    });
  }

  ngOnInit() {
    this.loadOffres();
  }

  loadOffres() {
    this.offreEmploiService.getAllOffresEmploi().subscribe(
      (data) => {
        console.log('Données reçues du backend:', data);
        this.offres = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des offres :', error);
      }
    );
  }

  onEdit(offre: OffreEmploi) {
    this.isEditMode = true;
    this.offreEnCours = offre;

    console.log('Offre à modifier :', offre);

    this.editForm.patchValue({
      id: offre.id,
      titre: offre.titre,
      categorie: offre.categorie,
      localisation: offre.localisation,
      salaireMin: offre.salaireMin,
      salaireMax: offre.salaireMax,
      typeContrat: offre.typeContrat,
      competencesRequises: offre.competencesRequises
    });
  }

  get filteredOffres() {
    if (!this.searchTerm) {
      return this.offres;
    }

    return this.offres.filter((offre) =>
      offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      offre.categorie.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      offre.localisation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSave() {
    if (this.editForm.valid) {
      this.offreEmploiService.updateOffreEmploi(this.editForm.value.id, this.editForm.value).subscribe(
        () => {
          this.isEditMode = false;
          this.offreEnCours = null;
          this.loadOffres();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'offre :', error);
        }
      );
    }
  }

  onCancelEdit() {
    this.isEditMode = false;
    this.offreEnCours = null;
    this.editForm.reset();
  }

  supprimerOffre(id: number) {
    this.offreEmploiService.deleteOffreEmploi(id).subscribe(
      () => {
        this.loadOffres();
      },
      (error) => {
        console.error("Erreur lors de la suppression :", error);
      }
    );
  }
}