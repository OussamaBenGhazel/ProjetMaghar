export class OffreEmploi {
  constructor(
    public id: number,
    public titre: string,
    public description: string,
    public categorie: string,
    public localisation: string,
    public salaireMin: number,
    public salaireMax: number,
    public typeContrat: string,
    public dateDebut: string,         // Notez ici : dateDebut au lieu de datePublication
    public dateFin: string,           // Notez ici : dateFin au lieu de dateExpiration
    public experienceRequise: string, // Probablement niveauExperience dans le formulaire
    public competencesRequises: string,
    public nombreCandidatures: number // Ajout du champ
  ) {}
}