export class Facture {
    id?: number;
    numeroFacture: string;
    userId: number;
    dateEmission?: string;
    dateEcheance?: string;
    montantTotal: number;
    statut: string;
    datePaiement?: string;
    createdAt?: string;
    updatedAt?: string;
  
    constructor(data: Partial<Facture> = {}) {
      this.id = data.id;
      this.numeroFacture = data.numeroFacture || '';
      this.userId = data.userId || 0;
      this.dateEmission = data.dateEmission || new Date().toISOString();
      this.dateEcheance = data.dateEcheance || '';
      this.montantTotal = data.montantTotal || 0;
      this.statut = data.statut || 'PENDING';
      this.datePaiement = data.datePaiement || '';
      this.createdAt = data.createdAt || new Date().toISOString();
      this.updatedAt = data.updatedAt || new Date().toISOString();
    }
  }
  