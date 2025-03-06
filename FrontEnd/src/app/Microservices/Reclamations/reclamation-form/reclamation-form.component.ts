import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/Reclamation-Service/reclamation.service';
import { Reclamation } from 'src/app/core/models/reclamation.model';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

// Custom Validator to check for numbers
export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /\d/.test(control.value); // Check if the value contains any digits
    return forbidden ? { 'noNumbers': { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.css']
})
export class ReclamationFormComponent implements OnInit {
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
      clientName: [
        '', 
        [Validators.required, Validators.maxLength(100), noNumbersValidator()]  // Apply the custom validator here
      ],
      typeReclamation: ['', [Validators.required]], 
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      statut: ['EN_ATTENTE'],  // Ensure a default value for 'statut' when creating a new reclamation
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      const reclamationId = Number(this.route.snapshot.paramMap.get('id'));
      if (!reclamationId) {
        console.error('ID de réclamation invalide.');
        return;
      }

      this.reclamationService.getReclamationById(reclamationId).subscribe(
        (reclamation: Reclamation) => {
          if (reclamation) {
            this.reclamationForm.patchValue(reclamation);
            // Don't overwrite 'statut' if it's not needed
            if (!reclamation.statut) {
              this.reclamationForm.get('statut')?.setValue('EN_ATTENTE');
            }
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération de la réclamation:', error.message);
        }
      );
    }
  }

  saveReclamation() {
    if (this.reclamationForm.invalid) {
      return; // Prevent submission if the form is invalid
    }
  
    const formValue = this.reclamationForm.value;
  
    // If editing, make sure the ID is included in the request
    if (this.isEdit) {
      const reclamationId = Number(this.route.snapshot.paramMap.get('id'));
      if (reclamationId) {
        formValue.id = reclamationId; // Add the ID to the form data for the update request
      }
      console.log("Updating reclamation...", formValue);
      this.reclamationService.updateReclamation(formValue).subscribe(
        (response: Reclamation) => {
          console.log("Reclamation updated:", response);
          this.router.navigate(['/reclamations']); // Redirect to the list page after update
        },
        (error: HttpErrorResponse) => {
          console.error("Error updating:", error.message);
          // Optionally, show an error message to the user
        }
      );
    } else {
      console.log("Creating new reclamation...", formValue);
      this.reclamationService.createReclamation(formValue).subscribe(
        (response: Reclamation) => {
          console.log("Reclamation created:", response);
          this.router.navigate(['/reclamations']); // Redirect to the list page after creation
        },
        (error: HttpErrorResponse) => {
          console.error("Error creating:", error.message);
          // Optionally, show an error message to the user
        }
      );
    }
  }
  
}
