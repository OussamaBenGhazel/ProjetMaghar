import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreEmploiService } from '../../services/offre-emploi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-offre-emploi',
  templateUrl: './ajouter-offre-emploi.component.html',
  styleUrls: ['./ajouter-offre-emploi.component.css']
})
export class AjouterOffreEmploiComponent implements OnInit {
  offreEmploiForm!: FormGroup;
  isEditMode: boolean = false;
  selectedOffreId: number | null = null;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private offreEmploiService: OffreEmploiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.offreEmploiForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categorie: ['', Validators.required],
      localisation: ['', Validators.required],
      salaireMin: [null, [Validators.required, Validators.min(0)]],
      salaireMax: [null, [Validators.required, Validators.min(0)]],
      typeContrat: ['', Validators.required],
      datePublication: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      niveauExperience: [null, [Validators.required, Validators.pattern('^[0-9]+$')]], // Renommé de experienceRequise à niveauExperience
      competencesRequises: ['', Validators.required],
      isPublished: [false]
    }, { validators: this.validateSalariesAndDates });

    this.offreEmploiForm.valueChanges.subscribe(() => {
      console.log('Formulaire valide ?', this.offreEmploiForm.valid);
      console.log('Erreurs du formulaire :', this.offreEmploiForm.errors);
      console.log('Valeurs du formulaire :', this.offreEmploiForm.value);
    });
  }

  consulterOffres(): void {
    this.router.navigate(['/liste-offres-emploi']);
  }

  onSubmit(): void {
    if (this.offreEmploiForm.valid) {
      const offreEmploi = this.offreEmploiForm.value;
      console.log('Données envoyées au backend :', offreEmploi);
      this.offreEmploiService.createOffreEmploi(offreEmploi).subscribe(
        (response) => {
          console.log('Offre d\'emploi ajoutée', response);
          this.showSuccessAlert = true;
          this.offreEmploiForm.reset();
          setTimeout(() => {
            this.showSuccessAlert = false;
            this.router.navigate(['/offres-emploi']);
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'offre d\'emploi', error);
          this.showErrorAlert = true;
          setTimeout(() => this.showErrorAlert = false, 3000);
        }
      );
    } else {
      console.log('Formulaire invalide, vérifiez les champs.');
      this.markFormGroupTouched(this.offreEmploiForm);
    }
  }

  onEdit(): void {
    if (this.selectedOffreId !== null && this.offreEmploiForm.valid) {
      const updatedOffre = this.offreEmploiForm.value;
      this.offreEmploiService.updateOffreEmploi(this.selectedOffreId, updatedOffre).subscribe(
        (response) => {
          console.log('Offre d\'emploi modifiée', response);
          this.router.navigate(['/offres-emploi']);
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'offre d\'emploi', error);
        }
      );
    }
  }

  onDelete(): void {
    if (this.selectedOffreId !== null) {
      this.offreEmploiService.deleteOffreEmploi(this.selectedOffreId).subscribe(
        () => {
          console.log('Offre d\'emploi supprimée');
          this.router.navigate(['/offres-emploi']);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'offre d\'emploi', error);
        }
      );
    }
  }

  loadOffreForEdit(offreId: number): void {
    this.offreEmploiService.getOffreEmploiById(offreId).subscribe((offre) => {
      this.selectedOffreId = offreId;
      this.isEditMode = true;
      this.offreEmploiForm.patchValue(offre);
    });
  }

  validateSalariesAndDates(group: FormGroup) {
    const salaireMin = group.get('salaireMin')?.value;
    const salaireMax = group.get('salaireMax')?.value;
    const datePublication = group.get('datePublication')?.value;
    const dateExpiration = group.get('dateExpiration')?.value;

    if (salaireMin !== null && salaireMax !== null && salaireMax < salaireMin) {
      return { invalidSalaries: true };
    }
    if (datePublication && dateExpiration && new Date(dateExpiration) <= new Date(datePublication)) {
      return { invalidDates: true };
    }
    return null;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}