// Enum for Statut
export enum Statut {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE'
}

// Interface for Reclamation
export interface Reclamation {
  id?: number;
  clientName: string;
  typeReclamation: string;
  titre: string;
  description?: string;
  statut: Statut; 
  dateCreation: string;
  email: string;  // Added email field
  codeReclamation: string;  // Added unique code field for reclamation
}

export interface DemandeAssistance {
  id?: number;               
  clientName: string;       
  assistanceType: string;    
  location: string;           
  statut: Statut;             
  dateRequested: string;      
  description?: string;       
}