import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assurance } from 'src/app/core/models/assurance.model';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';
import { UserService } from 'src/app/services/Assurance-service/user-service.service';
import SignaturePad from 'signature_pad';

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
    dateDebut: new Date(),
    dateFin: new Date(),
    prime: 0,
    montantAssure: 0,
    conditionsGenerales: '',
    statut: 'InProgress' as StatutContrat, // Statut par défaut défini comme InProgress
    signature: '',
    userId: 0,
    assuranceId: 0
  };
  selectedAssurance: Assurance | null = null;
  assuranceId: number | null = null;
  contratId: number | null = null;
  isEditMode = false;

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
      const contratId = params.get('contratId');

      if (contratId) {
        this.contratId = parseInt(contratId, 10);
        this.isEditMode = true;
        this.loadContrat(this.contratId);
      } else if (assuranceId) {
        this.assuranceId = parseInt(assuranceId, 10);
        this.loadAssuranceData(this.assuranceId);
        this.generateContractNumber();
      } else {
        console.error('❌ Aucun ID fourni dans l’URL');
      }
    });

    this.loadUserData();
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvas.nativeElement, {
      minWidth: 1,
      maxWidth: 3,
      backgroundColor: 'white',
      penColor: 'black'
    });
    if (this.isEditMode && this.contrat.signature) {
      this.signaturePad.fromDataURL(this.contrat.signature);
      console.log('📌 Signature initiale chargée dans le canvas');
    }
  }

  private generateContractNumber(): void {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.contrat.numeroContrat = `CTR-${timestamp}-${randomNum}`;
  }

  loadAssuranceData(assuranceId: number): void {
    this.assuranceService.getAssuranceById(assuranceId).subscribe(
      (assurance: Assurance) => {
        this.selectedAssurance = assurance;
        this.contrat.prime = assurance.prime;
        this.contrat.montantAssure = assurance.montantAssure ?? 0;
        this.contrat.conditionsGenerales = assurance.conditionsGenerales ?? '';
        this.contrat.assuranceId = assurance.id!;
        this.contrat.dateDebut = new Date(assurance.dateEffective);
        this.contrat.dateFin = new Date(assurance.dateExpiration);
      },
      error => console.error('❌ Erreur lors du chargement de l’assurance :', error)
    );
  }

  loadContrat(contratId: number): void {
    this.contratService.getContratById(contratId).subscribe(
      (contrat: Contrat) => {
        this.contrat = {
          ...contrat,
          dateDebut: new Date(contrat.dateDebut),
          dateFin: new Date(contrat.dateFin)
        };
        this.assuranceId = contrat.assuranceId;
        this.loadAssuranceData(this.assuranceId!);
        console.log('📌 Contrat chargé :', this.contrat);
      },
      error => console.error('❌ Erreur lors du chargement du contrat :', error)
    );
  }

  loadUserData(): void {
    this.userService.getUserById(this.user.id).subscribe(
      (user) => this.user = user,
      error => console.error('❌ Erreur lors du chargement de l’utilisateur :', error)
    );
  }

  async submitContratForm(): Promise<void> {
    this.saveSignature();
    this.contrat.userId = this.user.id;
    console.log('📌 Contrat avant envoi au backend :', JSON.stringify(this.contrat, null, 2));
    console.log('📌 Signature envoyée :', this.contrat.signature ? this.contrat.signature.substring(0, 50) + '...' : 'Vide');

    if (this.isEditMode && this.contratId) {
      this.contratService.updateContrat(this.contratId, this.contrat).subscribe(
        (updatedContrat) => {
          console.log('✅ Contrat mis à jour (réponse backend) :', updatedContrat);
          this.router.navigate(['/confirmation']);
        },
        error => console.error('❌ Erreur lors de la mise à jour du contrat :', error)
      );
    } else if (this.assuranceId) {
      this.contrat.assuranceId = this.assuranceId;
      this.contratService.createContratFromAssurance(this.assuranceId, this.user.id, this.contrat).subscribe(
        (newContrat) => {
          console.log('✅ Contrat créé :', newContrat);
          this.router.navigate(['/confirmation']);
        },
        error => console.error('❌ Erreur lors de la création du contrat :', error)
      );
    }
  }

  saveSignature(): void {
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      const newSignature = this.signaturePad.toDataURL();
      this.contrat.signature = newSignature;
      console.log('📌 Nouvelle signature capturée :', this.contrat.signature.substring(0, 50) + '...');
    } else {
      this.contrat.signature = '';
      console.log('📌 Signature effacée ou canvas vide');
    }
  }

  clearSignature(): void {
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.contrat.signature = '';
      console.log('📌 Signature effacée manuellement');
    }
  }

  isSignatureEmpty(): boolean {
    return this.signaturePad?.isEmpty() ?? true;
  }

  updateDateDebut(event: string): void {
    this.contrat.dateDebut = new Date(event);
  }

  updateDateFin(event: string): void {
    this.contrat.dateFin = new Date(event);
  }
}