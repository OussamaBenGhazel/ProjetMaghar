import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartenaireService } from 'src/app/services/Partenaire-Service/partenaire.service';
import { OffrePartenaireService } from 'src/app/services/OffrePartenaire-Service/offre-partenaire-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partenaire-list',
  templateUrl: './partenaire-list.component.html',
  styleUrls: ['./partenaire-list.component.css']
})
export class PartenaireListComponent implements OnInit {
<<<<<<< HEAD
  partenaires: any[] = [];

  constructor(private partenaireService: PartenaireService, private router: Router) {}

  ngOnInit() {
    this.loadPartenaires();
  }

  loadPartenaires() {
    this.partenaireService.getAllPartenaires().subscribe(data => {
=======
  partenaires: Partenaire[] = [];
  offres: any[] = [];
  showFormPartenaire: boolean = false;
  showFormOffre: boolean = false;
  newPartenaire: Partenaire = new Partenaire();
  newOffre: any = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null, nombrePlaces: 0, dateFin: '' };
  editPartenaire: Partenaire | null = null;
  editOffre: any | null = null;
  formPartenaire: Partenaire = new Partenaire();
  formOffre: any = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null, nombrePlaces: 0, dateFin: '' };
  showPopup: boolean = false;
  popupMessage: string = '';
  showOffreList: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;
  pOffres: number = 1;

  constructor(
    private partenaireService: PartenaireService,
    private offreService: OffrePartenaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPartenaires();
    this.getAllOffres();
  }

  toggleOffreList(): void {
    this.showOffreList = !this.showOffreList;
  }

  toggleFormPartenaire(): void {
    this.showFormPartenaire = !this.showFormPartenaire;
    this.showFormOffre = false;
    if (!this.showFormPartenaire) {
      this.resetFormPartenaire();
    }
  }

  toggleFormOffre(): void {
    this.showFormOffre = !this.showFormOffre;
    this.showFormPartenaire = false;
    if (!this.showFormOffre) {
      this.resetFormOffre();
    }
  }

  getAllPartenaires(): void {
    this.partenaireService.getAllPartenaires().subscribe((data) => {
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
      this.partenaires = data;
    });
  }

<<<<<<< HEAD
  deletePartenaire(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce partenaire ?')) {
      this.partenaireService.deletePartenaire(id).subscribe(() => {
        alert('Partenaire supprimé avec succès !');
        this.loadPartenaires(); // Recharger la liste après suppression
      });
    }
  }

  modifierPartenaire(id: number) {
    this.router.navigate(['/admin/partenaire-edit', id]); // Redirection vers le formulaire de modification
=======
  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe((offres) => {
      // Récupérer tous les partenaires d'abord
      this.partenaireService.getAllPartenaires().subscribe((partenaires) => {
        // Joindre les données du partenaire à chaque offre
        this.offres = offres.map(offre => {
          if (offre.partenaireId) {
            offre.partenaire = partenaires.find(p => p.id === offre.partenaireId);
          }
          return offre;
        });
        console.log('Offres avec partenaires:', this.offres);
      });
    });
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
  }

  deletePartenaire(id?: number): void {
    if (id === undefined) {
      this.showPopupMessage('ID invalide !');
      return;
    }
    if (confirm('Voulez-vous supprimer ce partenaire ?')) {
      this.partenaireService.deletePartenaire(id).subscribe({
        next: () => {
          this.showPopupMessage('Partenaire supprimé avec succès !');
          this.getAllPartenaires();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du partenaire :', err);
          this.showPopupMessage('Erreur lors de la suppression du partenaire.');
        },
      });
    }
  }

  editPartenaireForm(partenaire: Partenaire): void {
    this.editPartenaire = partenaire;
    this.formPartenaire = { ...partenaire };
    this.showFormPartenaire = true;
  }

  resetFormPartenaire(): void {
    this.formPartenaire = new Partenaire();
    this.editPartenaire = null;
  }

  savePartenaire(): void {
    if (this.editPartenaire) {
      this.partenaireService.updatePartenaire(this.editPartenaire.id!, this.formPartenaire).subscribe({
        next: () => {
          this.showPopupMessage('✅ Partenaire mis à jour avec succès !');
          this.getAllPartenaires();
          this.showFormPartenaire = false;
          this.resetFormPartenaire();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du partenaire :', err);
          this.showPopupMessage('❌ Erreur lors de la mise à jour.');
        },
      });
    } else {
      this.partenaireService.addPartenaire(this.formPartenaire).subscribe({
        next: () => {
          this.showPopupMessage('✅ Partenaire ajouté avec succès !');
          this.getAllPartenaires();
          this.showFormPartenaire = false;
          this.resetFormPartenaire();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du partenaire :', err);
          this.showPopupMessage('❌ Erreur lors de l\'ajout du partenaire.');
        },
      });
    }
  }

  deleteOffre(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.offreService.deleteOffre(id).subscribe({
        next: () => {
          this.showPopupMessage('Offre supprimée avec succès !');
          this.getAllOffres();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'offre :', err);
          this.showPopupMessage('Erreur lors de la suppression de l\'offre.');
        },
      });
    }
  }

  editOffreForm(offre: any): void {
    this.editOffre = offre;
    this.formOffre = { ...offre };
    this.showFormOffre = true;
  }

  resetFormOffre(): void {
    this.formOffre = { typeOffre: '', description: '', prix: 0, localisation: '', partenaire: null, nombrePlaces: 0, dateFin: '' };
    this.editOffre = null;
  }


  saveOffre(): void {
    const offreToSend = {
      ...this.formOffre,
      partenaireId: Number(this.formOffre.partenaire?.id || this.formOffre.partenaire),
      dateFin: this.formOffre.dateFin
    };
    delete offreToSend.partenaire;

    if (this.editOffre) {
      this.offreService.updateOffre(this.editOffre.id, offreToSend).subscribe({
        next: () => {
          this.showPopupMessage('Offre mise à jour avec succès !');
          this.getAllOffres(); // Recharger les offres
          this.showFormOffre = false;
          this.resetFormOffre();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.offreService.addOffre(offreToSend).subscribe({
        next: () => {
          this.showPopupMessage('Offre ajoutée avec succès !');
          this.getAllOffres(); // Recharger les offres
          this.showFormOffre = false;
          this.resetFormOffre();
        },
        error: (err) => console.error(err)
      });
    }
  }


  showPopupMessage(message: string): void {
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => this.showPopup = false, 3000);
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
