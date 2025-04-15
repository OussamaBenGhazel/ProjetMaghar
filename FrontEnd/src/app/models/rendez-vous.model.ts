export class RendezVous {
  id?: number;
  dateHeure: string;
  statut: string;
  nomClient: string;
  emailClient: string;
  numeroTelephoneClient?: string;
  agentAssurance?: { id: number };
  rappelActive: boolean = true; // Par défaut, le rappel est activé

  constructor(
      dateHeure: string = '',
      statut: string = 'En attente',
      nomClient: string = '',
      emailClient: string = '',
      numeroTelephoneClient: string = ''
  ) {
      this.dateHeure = dateHeure;
      this.statut = statut;
      this.nomClient = nomClient;
      this.emailClient = emailClient;
      this.numeroTelephoneClient = numeroTelephoneClient;
  }
}