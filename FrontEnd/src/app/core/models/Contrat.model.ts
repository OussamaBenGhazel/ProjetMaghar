import { Devis } from "./Devis .model";
import { Facture } from "./Facture .model";

export class Contrat {
  id?: number;
  numeroContrat: string;
  userId: number;
  assuranceId: number;
  dateDebut: Date;
  dateFin: Date;
  prime: number;
  montantAssure: number;
  conditionsGenerales: string;
  statut: StatutContrat;
  signature?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assurance?: Assurance;
  devis?: Devis;
  facture?: Facture;

  constructor(data: Partial<Contrat> = {}) {
    this.id = data.id || 0;
    this.numeroContrat = data.numeroContrat || '';
    this.userId = data.userId || 0;
    this.assuranceId = data.assuranceId || 0;
    this.dateDebut = data.dateDebut ? new Date(data.dateDebut) : new Date();
    this.dateFin = data.dateFin ? new Date(data.dateFin) : new Date();
    this.prime = data.prime || 0;
    this.montantAssure = data.montantAssure || 0;
    this.conditionsGenerales = data.conditionsGenerales || '';
    this.statut = data.statut || StatutContrat.ACTIVE;
    this.signature = data.signature || '';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.assurance = data.assurance ? new Assurance(data.assurance) : undefined;
    this.devis = data.devis ? new Devis(data.devis) : undefined;
    this.facture = data.facture ? new Facture(data.facture) : undefined;
  }
}

export enum StatutContrat {
  ACTIVE = "ACTIVE",
  EXPIRE = "EXPIRE",
  SUSPENDU = "SUSPENDU"
}

export class Assurance {
  id: number;
  nom: string;

  constructor(data?: Partial<Assurance>) {
    this.id = data?.id || 0;
    this.nom = data?.nom || '';
  }
}

export class devis {
  id: number;
  montant: number;

  constructor(data?: Partial<Devis>) {
    this.id = data?.id || 0;
    this.montant = data?.montantAssureTotal || 0;
  }
}

export class facture {
  id: number;
  montant: number;

  constructor(data?: Partial<Facture>) {
    this.id = data?.id || 0;
    this.montant = data?.montantTotal || 0;
  }
}
// Removed duplicate enum definition