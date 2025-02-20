import { Devis } from "./Devis .model";
import { Facture } from "./Facture .model";

export class Contrat {
    id: number;
    numeroContrat: string;
    userId: number;
    referenceDevis?: number;
    dateDebut: Date;
    dateFin: Date;
    prime: number;
    montantAssure: number;
    conditionsGenerales: string;
    statut: StatutContrat;
    createdAt: Date;
    updatedAt: Date;
    assurance: Assurance;
    devis?: Devis;
    facture?: Facture;
  assuranceId: any;
  
    constructor(data: Partial<Contrat> = {}) {
      this.id = data.id || 0;
      this.numeroContrat = data.numeroContrat || '';
      this.userId = data.userId || 0;
      this.referenceDevis = data.referenceDevis;
      this.dateDebut = data.dateDebut || new Date();
      this.dateFin = data.dateFin || new Date();
      this.prime = data.prime || 0;
      this.montantAssure = data.montantAssure || 0;
      this.conditionsGenerales = data.conditionsGenerales || '';
      this.statut = data.statut || StatutContrat.ACTIVE;
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
      this.assurance = data.assurance || new Assurance();
      this.devis = data.devis;
      this.facture = data.facture;
    }
  }
  
  export enum StatutContrat {
    ACTIVE = "ACTIVE",
    EXPIRE = "EXPIRE",
    SUSPENDU = "SUSPENDU"
  }
  
  export class Assurance {
    id: number = 0;
    nom: string = '';
  }
  