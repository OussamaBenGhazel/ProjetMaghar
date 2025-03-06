import { Contrat } from "./Contrat.model";

export class Facture {
    id?: number;
    userId?: number;
    numeroFacture?: string;
    contrat?: Contrat;
    dateEmission?: Date;
    dateEcheance?: Date;
    montantTotal?: number | string; // Compatible avec BigDecimal
    montantTaxes?: number | string;
    tauxTaxe?: number | string;
    statut?: StatutFacture;
    referencePaiement?: string;
    urlPaiement?: string;
    commentaires?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export enum StatutFacture {
    EN_ATTENTE = 'EN_ATTENTE',
    EN_ATTENTE_CONFIRMATION = 'EN_ATTENTE_CONFIRMATION',
    PAYEE = 'PAYEE',
    ECHEC = 'ECHEC'
  }