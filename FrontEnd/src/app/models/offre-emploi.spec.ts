import { OffreEmploi } from './offre-emploi';

describe('OffreEmploi', () => {
  it('should create an instance', () => {
    const offre = new OffreEmploi(
      1,  // id
      'Développeur Angular',  // titre
      'Développement d\'applications Angular',  // description
      'Informatique',  // catégorie
      'Paris',  // localisation
      3000,  // salaireMin
      5000,  // salaireMax
      'CDI',  // typeContrat
      '2025-03-01',  // datePublication
      '2025-06-01',  // dateExpiration
      'Junior',  // niveauExperience
      'Angular, TypeScript, HTML'  // competencesRequises
    );
    expect(offre).toBeTruthy();
  });
});
