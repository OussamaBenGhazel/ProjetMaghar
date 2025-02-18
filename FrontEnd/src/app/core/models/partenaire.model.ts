export class Partenaire {
  id?: number; // `id` est optionnel car il est généré par la base de données
  nom: string;
  type: string; // Garage, Clinique, etc.
  adresse: string;
  telephone: string;
  latitude: number;
  longitude: number;

  constructor(init?: Partial<Partenaire>) {
    this.id = init?.id;
    this.nom = init?.nom || '';
    this.type = init?.type || '';
    this.adresse = init?.adresse || '';
    this.telephone = init?.telephone || '';
    this.latitude = init?.latitude ?? 0;
    this.longitude = init?.longitude ?? 0;
  }
}
