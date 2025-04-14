import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/Reclamation-Service/reclamation.service';
import { Reclamation } from 'src/app/core/models/reclamation.model';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

// ✅ Validator pour interdire les chiffres dans le nom
export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /\d/.test(control.value);
    return forbidden ? { 'noNumbers': { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-reclamations-forms-component',
  templateUrl: './reclamations-forms-component.component.html',
  styleUrls: ['./reclamations-forms-component.component.css']
})
export class ReclamationsFormsComponentComponent implements OnInit {
  isEdit: boolean = false;
  reclamationForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamationService: ReclamationService,
    private fb: FormBuilder
  ) {
    this.isEdit = this.route.snapshot.paramMap.has('id');
    this.reclamationForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.maxLength(100), noNumbersValidator()]],
      email: ['', [Validators.required, Validators.email]],  // New email field
      typeReclamation: ['', Validators.required],
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      statut: ['EN_ATTENTE'],
      recaptcha: ['', Validators.required] // ✅ reCAPTCHA obligatoire
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      const reclamationId = Number(this.route.snapshot.paramMap.get('id'));
      if (isNaN(reclamationId)) {
        console.error('ID de réclamation invalide.');
        return;
      }

      this.reclamationService.getReclamationById(reclamationId).subscribe(
        (reclamation: Reclamation) => {
          if (reclamation) {
            this.reclamationForm.patchValue({
              clientName: reclamation.clientName,
              email: reclamation.email,
              typeReclamation: reclamation.typeReclamation,
              titre: reclamation.titre,
              description: reclamation.description,
              statut: reclamation.statut || 'EN_ATTENTE'  // Ensure statut is set
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération de la réclamation:', error);
        }
      );
    }
  }

  // ✅ Gère la réponse du reCAPTCHA
  onCaptchaResolved(token: string): void {
    this.reclamationForm.get('recaptcha')?.setValue(token);
  }

  saveReclamation() {
    if (this.reclamationForm.invalid) {
      this.reclamationForm.markAllAsTouched();
      return;
    }

    const formValue = this.reclamationForm.value;

    if (this.isEdit) {
      const reclamationId = Number(this.route.snapshot.paramMap.get('id'));
      if (reclamationId) {
        formValue.id = reclamationId;
      }

      this.reclamationService.updateReclamation(formValue).subscribe(
        (response: Reclamation) => {
          console.log("Réclamation mise à jour :", response);
          // Clear form and redirect to confirmation page after successful update
          this.reclamationForm.reset();
          this.router.navigate(['/reclamation-confirmation']);
        },
        (error: HttpErrorResponse) => {
          console.error("Erreur lors de la mise à jour :", error.message);
          alert(`Une erreur est survenue lors de la mise à jour de la réclamation. Code: ${error.status}`);
        }
      );
    } else {
      this.reclamationService.createReclamation(formValue).subscribe(
        (response: Reclamation) => {
          console.log("Réclamation créée :", response);
          // Clear form and redirect to confirmation page after successful creation
          this.reclamationForm.reset();
          this.router.navigate(['/reclamation-confirmation']);
        },
        (error: HttpErrorResponse) => {
          console.error("Erreur lors de la création :", error.message);
          alert(`Une erreur est survenue lors de la création de la réclamation. Code: ${error.status}`);
        }
      );
    }
  }
}
