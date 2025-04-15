export class OffrePartenaire {
  id?: number;
  typeOffre: string;
  description: string;
  prix: number;
  localisation: string;
  partenaireId?: number;
<<<<<<< HEAD
=======
  nombrePlaces: number; // Ajout du nombre de places
  dateFin: string; // Ajout de la date de fin
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8

  constructor(init?: Partial<OffrePartenaire>) {
    this.id = init?.id;
    this.typeOffre = init?.typeOffre || '';
    this.description = init?.description || '';
    this.prix = init?.prix ?? 0;
    this.localisation = init?.localisation || '';
    this.partenaireId = init?.partenaireId;
<<<<<<< HEAD
=======
    this.nombrePlaces = init?.nombrePlaces ?? 0; // Initialisation du nombre de places
    this.dateFin = init?.dateFin || ''; // Initialisation de la date de fin
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
  }
}
