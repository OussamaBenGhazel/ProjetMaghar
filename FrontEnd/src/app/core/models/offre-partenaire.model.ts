export class OffrePartenaire {
  id?: number;
  typeOffre: string;
  description: string;
  prix: number;
  localisation: string;
  partenaireId?: number;
  nombrePlaces: number; // Ajout du nombre de places
  dateFin: string; // Ajout de la date de fin

  constructor(init?: Partial<OffrePartenaire>) {
    this.id = init?.id;
    this.typeOffre = init?.typeOffre || '';
    this.description = init?.description || '';
    this.prix = init?.prix ?? 0;
    this.localisation = init?.localisation || '';
    this.partenaireId = init?.partenaireId;
    this.nombrePlaces = init?.nombrePlaces ?? 0; // Initialisation du nombre de places
    this.dateFin = init?.dateFin || ''; // Initialisation de la date de fin
  }
}
