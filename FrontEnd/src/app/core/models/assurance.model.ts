export class Assurance {
  id?: number;
  nom: string;
  description?: string;
  couvertureDetails?: string;
  prime: number;
  montantAssure?: number;
  deductible?: number;
  type: string;
  conditionsGenerales?: string;
  dateEffective: string;
  dateExpiration: string;
  statut: string;
  createdAt?: string;
  updatedAt?: string;
  userId: any;

  constructor(data: Partial<Assurance> = {}) {
    this.id = data.id;
    this.nom = data.nom || '';
    this.description = data.description || '';
    this.couvertureDetails = data.couvertureDetails || '';
    this.prime = data.prime || 0;
    this.montantAssure = data.montantAssure || 0;
    this.deductible = data.deductible || 0;
    this.type = data.type || 'SANTE';
    this.conditionsGenerales = data.conditionsGenerales || '';
    this.dateEffective = data.dateEffective || '';
    this.dateExpiration = data.dateExpiration || '';
    this.statut = data.statut || 'ACTIVE';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }
}
