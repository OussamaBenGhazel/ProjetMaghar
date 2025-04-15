export class Devis {
    id?: number;
    numeroDevis: string;
    userId: number;
    primeEstimee?: number;
    montantAssureTotal?: number;
    dateValidite?: string;
    statut: string;
    createdAt?: string;
    updatedAt?: string;
  
    constructor(data: Partial<Devis> = {}) {
      this.id = data.id;
      this.numeroDevis = data.numeroDevis || '';
      this.userId = data.userId || 0;
      this.primeEstimee = data.primeEstimee || 0;
      this.montantAssureTotal = data.montantAssureTotal || 0;
      this.dateValidite = data.dateValidite || '';
      this.statut = data.statut || 'DRAFT';
      this.createdAt = data.createdAt || new Date().toISOString();
      this.updatedAt = data.updatedAt || new Date().toISOString();
    }
  }
  