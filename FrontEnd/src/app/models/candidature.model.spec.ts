import { Candidature } from './candidature.model';
import { OffreEmploi } from './offre-emploi'; // Vérifie bien le bon chemin du fichier

describe('Candidature', () => {
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
      '2025-03-01',  // dateDebut
      '2025-06-01',  // dateFin
      'Junior',  // experienceRequise
      'Angular, TypeScript, HTML'  // competencesRequises
    );

    const candidature = new Candidature(
      1,  // id
      'John Doe',  // nom
      'john.doe@example.com',  // email
      'http://example.com/cv',  // cvUrl
      'Motivation letter content',  // lettreMotivation
      'En attente',  // statut
      offre // ⚠️ Ne pas oublier de passer l'offre ici !
    );

    expect(candidature).toBeTruthy();
  });
});
