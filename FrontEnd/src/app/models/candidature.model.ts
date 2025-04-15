export interface Candidature {
  id: number;
  nom: string;
  email: string;
  cvPath: string; // Remplace cvUrl par cvPath
  lettreMotivation: string;
  statut: string;
  analyseResult?: string; // Optionnel
  offreEmploi: OffreEmploi | null;
}

export interface OffreEmploi {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  localisation: string;
  salaireMin: number | string;
  salaireMax: number | string;
  typeContrat: string;
  competencesRequises: string;
}