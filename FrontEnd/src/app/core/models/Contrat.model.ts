// src/app/core/models/Contrat.model.ts
import { Assurance } from "./assurance.model"; // Importez la version complète avec 'type'
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
  assurance?: Assurance; // Doit être la version avec 'type'
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
    this.statut = data.statut || StatutContrat.InProgress;
    this.signature = data.signature || '';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.assurance = data.assurance ? new Assurance(data.assurance) : undefined;
    this.devis = data.devis ? new Devis(data.devis) : undefined;
    this.facture = data.facture ? new Facture(data.facture) : undefined;
  }
}

export enum StatutContrat {
  InProgress = "InProgress",
  ACTIVE = "ACTIVE",
  EXPIRE = "EXPIRE",
  PaymentPending = "PaymentPending",
  SUSPENDU = "SUSPENDU"
}

export class devis {
  id: number;
  montant: number;

  constructor(data: Partial<Devis> = {}) {
    this.id = data.id || 0;
    this.montant = data.montantAssureTotal || 0;
  }
}

export class facture {
  id: number;
  montant: number;

  constructor(data: Partial<Facture> = {}) {
    this.id = data.id || 0;
    this.montant = data.montantTotal || 0;
  }
}