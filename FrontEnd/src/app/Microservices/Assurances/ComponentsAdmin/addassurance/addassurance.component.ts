import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';
import { Assurance } from 'src/app/core/models/assurance.model';

@Component({
  selector: 'app-addassurance',
  templateUrl: './addassurance.component.html',
  styleUrls: ['./addassurance.component.css']
})
export class AddassuranceComponent implements OnInit {
  assuranceForm!: FormGroup;
  isEditMode = false;
  assuranceId?: number;

  typesAssurance = ['SANTE', 'AUTOMOBILE', 'VOYAGE', 'HABITATION'];
  statutsProduit = ['ACTIVE', 'INACTIVE'];

  constructor(
    private fb: FormBuilder,
    private assuranceService: AssuranceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    const today = new Date();
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);

    // Formater les dates au format yyyy-MM-dd pour <input type="date>
    const formatDate = (date: Date): string => date.toISOString().split('T')[0];

    this.assuranceForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      couvertureDetails: [''],
      prime: [0, [Validators.required, Validators.min(0)]],
      montantAssure: [0, [Validators.min(0)]],
      deductible: [0, [Validators.min(0)]],
      type: ['', Validators.required],
      conditionsGenerales: [''],
      dateEffective: [formatDate(today), Validators.required], // Aujourd'hui par défaut
      dateExpiration: [formatDate(oneYearLater), Validators.required], // Un an plus tard par défaut
      statut: ['', Validators.required]
    });
  }

  private checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.assuranceId = +params['id'];
        this.loadAssuranceForEdit(this.assuranceId);
      }
    });
  }

  private loadAssuranceForEdit(id: number): void {
    this.assuranceService.getAssuranceById(id).subscribe(assurance => {
      if (assurance) {
        this.assuranceForm.patchValue(assurance);
      }
    });
  }

  onSubmit(): void {
    if (this.assuranceForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const assuranceData: Assurance = this.assuranceForm.value;

    if (this.isEditMode && this.assuranceId) {
      this.updateAssurance(this.assuranceId, assuranceData);
    } else {
      this.createAssurance(assuranceData);
    }
  }

  private createAssurance(data: Assurance): void {
    this.assuranceService.createAssurance(data).subscribe(
      () => this.handleSuccess('créée'),
      error => this.handleError(error)
    );
  }

  private updateAssurance(id: number, data: Assurance): void {
    this.assuranceService.updateAssurance(id, data).subscribe(
      () => this.handleSuccess('mise à jour'),
      error => this.handleError(error)
    );
  }

  private handleSuccess(action: string): void {
    alert(`Assurance ${action} avec succès !`);
    this.router.navigate(['/admin/assurancesadmin']);
  }

  private handleError(error: any): void {
    console.error('Erreur :', error);
    alert('Une erreur est survenue.');
  }
}