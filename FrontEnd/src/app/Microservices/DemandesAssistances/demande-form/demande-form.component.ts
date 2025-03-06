import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeAssistanceService } from 'src/app/services/DemandeAssistance-Service/demandeassistance.service';
import { DemandeAssistance } from 'src/app/core/models/reclamation.model';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? { noNumbers: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit {
  isEdit: boolean = false;
  demandeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandeAssistanceService: DemandeAssistanceService,
    private fb: FormBuilder
  ) {
    this.isEdit = this.route.snapshot.paramMap.has('id');
    this.demandeForm = this.fb.group({
      clientName: [
        '',
        [Validators.required, Validators.maxLength(100), noNumbersValidator()]  
      ],
      assistanceType: ['', [Validators.required]], 
      location: ['', [Validators.required]], 
      description: ['', [Validators.maxLength(500)]], 
      status: ['EN_ATTENTE'],  
      dateRequested: [new Date().toISOString(), [Validators.required]]  
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      const demandeId = Number(this.route.snapshot.paramMap.get('id'));
      if (!demandeId) {
        console.error('ID de demande invalide.');
        return;
      }

      this.demandeAssistanceService.getDemandeAssistanceById(demandeId).subscribe(
        (demande: DemandeAssistance) => {
          if (demande) {
            this.demandeForm.patchValue(demande);

           
            if (!demande.statut) {
              this.demandeForm.get('status')?.setValue('EN_ATTENTE');
            }

           
            const formattedDate = new Date(demande.dateRequested).toISOString().slice(0, 16);
            this.demandeForm.get('dateRequested')?.setValue(formattedDate);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération de la demande:', error.message);
        }
      );
    }
  }

  saveDemande() {
    if (this.demandeForm.invalid) {
      console.warn('Formulaire invalide.');
      return; 
    }

    const formValue = this.demandeForm.value;

 
    if (this.isEdit) {
      const demandeId = Number(this.route.snapshot.paramMap.get('id'));
      if (demandeId) {
        formValue.id = demandeId; 
      }
      console.log("Updating demande d'assistance...", formValue);
      this.demandeAssistanceService.updateDemandeAssistance(formValue).subscribe(
        (response: DemandeAssistance) => {
          console.log('Demande mise à jour:', response);
          this.router.navigate(['/demandes-assistance']); 
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la mise à jour:', error.message);
        }
      );
    } else {
      console.log("Création d'une nouvelle demande d'assistance...", formValue);
      this.demandeAssistanceService.createDemandeAssistance(formValue).subscribe(
        (response: DemandeAssistance) => {
          console.log('Demande créée:', response);
          this.router.navigate(['/demandes-assistance']); 
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la création:', error.message);
        }
      );
    }
  }
}
