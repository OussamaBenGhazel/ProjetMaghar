import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/Reclamation-Service/reclamation.service';
import { Reclamation } from 'src/app/core/models/reclamation.model';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

// Custom Validator: no numbers in client name
export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumbers = /\d/.test(control.value);
    return hasNumbers ? { 'noNumbers': { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.css']
})
export class ReclamationFormComponent implements OnInit {
  reclamationForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamationService: ReclamationService,
    private fb: FormBuilder
  ) {
    this.isEdit = this.route.snapshot.paramMap.has('id');

    this.reclamationForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.maxLength(100), noNumbersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      typeReclamation: ['', Validators.required],
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      statut: ['EN_ATTENTE'],
      codeReclamation: [{ value: '', disabled: true }],
      dateCreation: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      const reclamationId = Number(this.route.snapshot.paramMap.get('id'));
      if (!reclamationId) {
        console.error('ID de réclamation invalide.');
        return;
      }

      this.reclamationService.getReclamationById(reclamationId).subscribe({
        next: (reclamation: Reclamation) => {
          if (reclamation) {
            this.reclamationForm.patchValue({
              ...reclamation,
              codeReclamation: reclamation.codeReclamation || '',
              dateCreation: reclamation.dateCreation || ''
            });

            if (!reclamation.statut) {
              this.reclamationForm.get('statut')?.setValue('EN_ATTENTE');
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération de la réclamation :', err.message);
        }
      });
    }
  }

  saveReclamation() {
    if (this.reclamationForm.invalid) {
      this.reclamationForm.markAllAsTouched();
      return;
    }

    const formValue = this.reclamationForm.getRawValue(); // get disabled fields too

    // Assurer un statut par défaut
    if (!formValue.statut) {
      formValue.statut = 'EN_ATTENTE';
    }

    if (this.isEdit) {
      const reclamationId = Number(this.route.snapshot.paramMap.get('id'));
      formValue.id = reclamationId;

      this.reclamationService.updateReclamation(formValue).subscribe({
        next: (response: Reclamation) => {
          alert('Réclamation mise à jour avec succès.');
          this.router.navigate(['/admin/reclamations']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur lors de la mise à jour :', err.message);
        }
      });
    } else {
      this.reclamationService.createReclamation(formValue).subscribe({
        next: (response: Reclamation) => {
          alert('Réclamation créée avec succès.');
          this.router.navigate(['/admin/reclamations']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur lors de la création :', err.message);
        }
      });
    }
  }
}
