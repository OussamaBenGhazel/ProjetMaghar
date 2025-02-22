import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assurance } from 'src/app/core/models/assurance.model';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';
import { UserService } from 'src/app/services/Assurance-service/user-service.service';

@Component({
  selector: 'app-contrat-form',
  templateUrl: './contrat-form.component.html',
  styleUrls: ['./contrat-form.component.css']
})
export class ContratFormComponent implements OnInit {

  user = { id: 1, nom: '', email: '' }; // Assurez-vous d'avoir un ID utilisateur correct
  contrat: Contrat = {
    numeroContrat: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    prime: 0,
    montantAssure: 0,
    conditionsGenerales: '',
    statut: 'ACTIVE' as StatutContrat,
    signature: '',
    userId: 0,
    assuranceId: 0
  };
  selectedAssurance: Assurance | null = null;
  assuranceId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assuranceService: AssuranceService,
    private userService: UserService,
    private contratService: ContratService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const assuranceId = params.get('assuranceId');
      if (assuranceId) {
        this.assuranceId = parseInt(assuranceId, 10);
        this.loadAssuranceData(this.assuranceId);
      }
    });

    this.loadUserData();
  }

  // Charger les informations de l'assurance sélectionnée
  loadAssuranceData(assuranceId: number): void {
    this.assuranceService.getAssuranceById(assuranceId).subscribe(
      (assurance: Assurance) => {
        this.selectedAssurance = assurance;
        this.contrat.prime = assurance.prime;
        this.contrat.montantAssure = assurance.montantAssure ?? 0;
        this.contrat.conditionsGenerales = assurance.conditionsGenerales ?? '';
      },
      error => {
        console.error('❌ Erreur lors du chargement de l’assurance :', error);
      }
    );
  }

  // Charger les informations de l'utilisateur connecté
  loadUserData(): void {
    const userId = this.user.id; // L'ID de l'utilisateur connecté (mettre à jour si besoin)
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
      },
      error => {
        console.error('❌ Erreur lors du chargement de l’utilisateur :', error);
      }
    );
  }

  // Soumission du formulaire pour créer un contrat
  submitContratForm(): void {
    if (this.assuranceId === null) {
      console.error('❌ Erreur: ID de l’assurance manquant.');
      return;
    }

    this.contratService.createContratFromAssurance(this.assuranceId, this.user.id, this.contrat).subscribe(
      (newContrat) => {
        console.log('✅ Contrat créé avec succès :', newContrat);
        this.router.navigate(['/confirmation']); // Redirection après succès
      },
      error => {
        console.error('❌ Erreur lors de la création du contrat :', error);
      }
    );
  }
}
