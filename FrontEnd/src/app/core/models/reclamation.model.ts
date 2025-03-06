// Enum pour Statut
export enum Statut {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE'
}



// Interface pour Reclamation
export interface Reclamation {
  id?: number;
  clientName: string;
  typeReclamation: string;
  titre: string;
  description?: string;
  statut: Statut; 
  dateCreation: string;
 
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