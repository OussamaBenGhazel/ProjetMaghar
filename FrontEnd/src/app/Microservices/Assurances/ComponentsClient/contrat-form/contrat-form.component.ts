import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class ContratFormComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;

  user = { id: 1, nom: '', email: '' };
  contrat: Contrat = {
    numeroContrat: '',
    dateDebut: new Date(), // Valeur par défaut initiale, sera mise à jour
    dateFin: new Date(),   // Valeur par défaut initiale, sera mise à jour
    prime: 0,
    montantAssure: 0,
    conditionsGenerales: '',
    statut: '' as StatutContrat,
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
      if (assuranceId !== null) {
        this.assuranceId = parseInt(assuranceId, 10);
        this.loadAssuranceData(this.assuranceId);
      } else {
        console.error('❌ Aucun assuranceId trouvé dans l’URL');
      }
    });

    this.loadUserData();
    this.generateContractNumber();
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvas.nativeElement, {
      minWidth: 1,
      maxWidth: 3,
      backgroundColor: 'white',
      penColor: 'black'
    });
  }

  private generateContractNumber(): void {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.contrat.numeroContrat = `CTR-${timestamp}-${randomNum}`;
    console.log('📌 Numéro de contrat généré :', this.contrat.numeroContrat);
  }

  loadAssuranceData(assuranceId: number): void {
    this.assuranceService.getAssuranceById(assuranceId).subscribe(
      (assurance: Assurance) => {
        this.selectedAssurance = assurance;
        this.contrat.prime = assurance.prime;
        this.contrat.montantAssure = assurance.montantAssure ?? 0;
        this.contrat.conditionsGenerales = assurance.conditionsGenerales ?? '';
        // Mise à jour des dates du contrat avec celles de l'assurance
        if (assurance.dateEffective) { // Correction ici : ajout de ')'
          this.contrat.dateDebut = new Date(assurance.dateEffective); // Assurez-vous que c'est une Date valide
        }
        if (assurance.dateExpiration) { // Correction ici : ajout de ')'
          this.contrat.dateFin = new Date(assurance.dateExpiration); // Assurez-vous que c'est une Date valide
        }
        console.log('📌 Dates mises à jour :', {
          dateDebut: this.contrat.dateDebut,
          dateFin: this.contrat.dateFin
        });
      },
      error => {
        console.error('❌ Erreur lors du chargement de l’assurance :', error);
      }
    );
  }

  loadUserData(): void {
    const userId = this.user.id;
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
      },
      error => {
        console.error('❌ Erreur lors du chargement de l’utilisateur :', error);
      }
    );
  }

  submitContratForm(): void {
    if (this.assuranceId === null) {
      console.error('❌ Erreur: ID de l’assurance manquant.');
      return;
    }

    this.saveSignature().then(() => {
      this.contrat.userId = this.user.id;
      this.contrat.assuranceId = this.assuranceId!;
      this.contratService.createContratFromAssurance(this.assuranceId!, this.user.id, this.contrat).subscribe(
        (newContrat) => {
          console.log('✅ Contrat créé avec succès :', newContrat);
          this.router.navigate(['/confirmation']);
        },
        error => {
          console.error('❌ Erreur lors de la création du contrat :', error);
        }
      );
    }).catch(error => {
      console.error('❌ Erreur lors de la sauvegarde de la signature :', error);
    });
  }

  async saveSignature(): Promise<void> {
    if (!this.signaturePad.isEmpty()) {
      const signatureBase64 = this.signaturePad.toDataURL();
      this.contrat.signature = signatureBase64;
      console.log('📌 Signature capturée :', signatureBase64);
    } else {
      console.warn('❌ Signature vide');
    }
  }

  clearSignature(): void {
    this.signaturePad.clear();
    this.contrat.signature = '';
  }
}