import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from 'src/app/core/models/Contrat.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html'
})
export class ContractFormComponent implements OnInit {
  assurance: any;
  contractForm = this.fb.group({
    userId: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    acceptConditions: [false, Validators.requiredTrue]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private assuranceService: AssuranceService,
    private contratService: ContratService
  ) {}

  ngOnInit() {
    const assuranceId = this.route.snapshot.paramMap.get('id');
    this.loadAssuranceDetails(assuranceId!);
  }

  loadAssuranceDetails(id: string) {
    this.assuranceService.getAssuranceById(+id).subscribe({
      next: (data) => this.assurance = data,
      error: () => this.router.navigate(['/assurances'])
    });
  }

  onSubmit() {
    if (this.contractForm.valid && this.assurance) {
      const contratData: Contrat = {
        id: 0, // or some default value
        numeroContrat: '', // or some default value
        conditionsGenerales: '', // or some default value
        statut: 'AcCTIVE', // or some default value
        dateCreation: new Date(), // or some default value
        dateModification: new Date(), // or some default value
        ...this.contractForm.value,
        assuranceId: this.assurance.id,
        prime: this.assurance.prime,
        montantAssure: this.assurance.montantAssure
      };

      this.contratService.createContratFromAssurance(
        this.assurance.id,
        contratData
      ).subscribe({
        next: () => this.router.navigate(['/contrats']),
        error: (err) => console.error('Erreur de création', err)
      });
    }
  }
}