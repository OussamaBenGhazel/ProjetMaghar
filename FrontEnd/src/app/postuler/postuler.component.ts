import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatureService } from '../services/candidature.service';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit {
  candidatureForm!: FormGroup;
  offreEmploiId: number = 0;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('PostulerComponent chargé');
  }

  ngOnInit(): void {
    const offreIdParam = this.route.snapshot.paramMap.get('id');
    this.offreEmploiId = offreIdParam ? +offreIdParam : 0;
    console.log('ID de l’offre reçu :', this.offreEmploiId);

    if (this.offreEmploiId === 0) {
      console.error('ID invalide ou non fourni');
      this.showErrorAlert = true;
      return;
    }

    this.candidatureForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lettreMotivation: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    console.log('onSubmit appelé');
    if (this.candidatureForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('nom', this.candidatureForm.get('nom')?.value);
      formData.append('email', this.candidatureForm.get('email')?.value);
      formData.append('cvFile', this.selectedFile);
      formData.append('lettreMotivation', this.candidatureForm.get('lettreMotivation')?.value);
      formData.append('offreId', this.offreEmploiId.toString());

      console.log('FormData envoyé :', formData);

      this.candidatureService.createCandidature(formData).subscribe({
        next: (response) => {
          console.log('Candidature envoyée avec succès:', response);
          this.showSuccessAlert = true;
          this.candidatureForm.reset();
          this.selectedFile = null;
          setTimeout(() => {
            this.showSuccessAlert = false;
            this.router.navigate(['/nos-offres']);
          }, 3000);
        },
        error: (error) => {
          console.error('Erreur lors de l’envoi:', error);
          this.showErrorAlert = true;
          setTimeout(() => this.showErrorAlert = false, 3000);
        }
      });
    } else {
      console.log('Formulaire invalide ou fichier non sélectionné');
      this.candidatureForm.markAllAsTouched();
      if (!this.selectedFile) {
        console.log('Aucun fichier CV sélectionné');
      }
    }
  }
}