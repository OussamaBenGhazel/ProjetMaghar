export class OffrePartenaire {
  id?: number;
  typeOffre: string;
  description: string;
  prix: number;
  localisation: string;
  partenaireId?: number;

  constructor(init?: Partial<OffrePartenaire>) {
    this.id = init?.id;
    this.typeOffre = init?.typeOffre || '';
    this.description = init?.description || '';
    this.prix = init?.prix ?? 0;
    this.localisation = init?.localisation || '';
    this.partenaireId = init?.partenaireId;
  }
}
