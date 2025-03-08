import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrat, StatutContrat } from 'src/app/core/models/Contrat.model';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listcontratclient',
  templateUrl: './listcontratclient.component.html',
  styleUrls: ['./listcontratclient.component.css']
})
export class ListcontratclientComponent implements OnInit {
  contrats: Contrat[] = [];
  filteredContrats: Contrat[] = [];
  contratToDelete: Contrat | null = null;
  showPopup: boolean = false;
  filterDateDebut: string = '';
  filterDateFin: string = '';
  filterStatut: StatutContrat | '' = '';
  p: number = 1; // Page actuelle pour la pagination
  itemsPerPage: number = 6; // Nombre d'éléments par page

  readonly statuts = Object.values(StatutContrat);

  constructor(private contratService: ContratService, private router: Router) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getAllContrats().subscribe(
      (response: any) => {
        console.log('Réponse brute reçue :', response);
        try {
          this.contrats = response.map((c: Contrat) => ({
            ...c,
            dateDebut: new Date(c.dateDebut),
            dateFin: new Date(c.dateFin)
          }));
          // Vérifier les contrats qui expirent aujourd'hui ou dans deux jours
          this.checkAndUpdateExpiredContracts();
          this.filteredContrats = [...this.contrats];
        } catch (error) {
          console.error('Erreur de parsing JSON dans loadContrats:', error);
        }
      },
      error => {
        console.error('Erreur lors du chargement des contrats:', error);
      }
    );
  }

  // Vérifier les contrats qui expirent aujourd'hui ou dans deux jours
  private checkAndUpdateExpiredContracts(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure

    // Calculer la date dans deux jours
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
    twoDaysFromNow.setHours(0, 0, 0, 0);

    this.contrats.forEach(contrat => {
      const dateFin = new Date(contrat.dateFin);
      dateFin.setHours(0, 0, 0, 0); // Réinitialiser l'heure

      // Cas 1 : Si la date de fin est aujourd'hui, marquer comme EXPIRE
      if (dateFin.getTime() === today.getTime() && contrat.statut !== StatutContrat.EXPIRE) {
        contrat.statut = StatutContrat.EXPIRE;
        this.updateContratStatus(contrat);
        const formattedDateFin = contrat.dateFin.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        Swal.fire({
          title: 'Attention !',
          html: `
            <p>Date de fin : ${formattedDateFin}</p>
            <p>Attention ! Ce contrat (#${contrat.numeroContrat}) expire aujourd'hui. Vérifiez votre statut.</p>
          `,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }

      // Cas 2 : Si la date de fin est dans deux jours, afficher une alerte sans modifier le statut
      if (dateFin.getTime() === twoDaysFromNow.getTime()) {
        const formattedDateFin = contrat.dateFin.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        Swal.fire({
          title: 'Rappel !',
          html: `
            <p>Date de fin : ${formattedDateFin}</p>
            <p>Attention ! Ce contrat (#${contrat.numeroContrat}) expirera dans deux jours. Prenez les mesures nécessaires.</p>
          `,
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Mettre à jour le statut du contrat côté serveur
  private updateContratStatus(contrat: Contrat): void {
    if (contrat.id) {
      console.log('Mise à jour du contrat envoyé:', contrat); // Log des données envoyées
      this.contratService.updateContrat(contrat.id, contrat).subscribe(
        (response) => {
          console.log('Réponse du serveur après mise à jour:', response);
          console.log(`✅ Statut du contrat ${contrat.id} mis à jour à EXPIRE`);
          // Mettre à jour la liste des contrats filtrés après la mise à jour
          this.filteredContrats = this.filteredContrats.map(c =>
            c.id === contrat.id ? { ...c, statut: contrat.statut } : c
          );
        },
        (error) => {
          console.error('Détails de l\'erreur lors de la mise à jour:', error);
          // Vérifier si l'erreur contient un message spécifique
          const errorMessage = error.error?.message || 'Une erreur inconnue est survenue.';
          Swal.fire({
            title: 'Erreur',
            text: `Erreur lors de la mise à jour du statut du contrat: ${errorMessage}`,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('ID du contrat manquant pour la mise à jour:', contrat);
      Swal.fire({
        title: 'Erreur',
        text: 'L\'ID du contrat est manquant pour la mise à jour.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  }

  // Vérifier si une date est égale à aujourd'hui
  isDateToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure
    const contractDate = new Date(date);
    contractDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure
    return contractDate.getTime() === today.getTime();
  }

  // Fermer l'alerte locale
  dismissAlert(event: Event, contratId: number): void {
    event.preventDefault(); // Empêcher la propagation de l'événement
    // Logique facultative pour masquer l'alerte (par exemple, avec une propriété dans Contrat)
  }

  filterContrats(): void {
    let filtered = [...this.contrats];

    const debut = this.filterDateDebut ? new Date(this.filterDateDebut) : null;
    const fin = this.filterDateFin ? new Date(this.filterDateFin) : null;

    filtered = filtered.filter(contrat => {
      const dateDebutContrat = new Date(contrat.dateDebut);
      const dateFinContrat = new Date(contrat.dateFin);

      const isAfterDebut = debut ? dateDebutContrat >= debut : true;
      const isBeforeFin = fin ? dateFinContrat <= fin : true;

      return isAfterDebut && isBeforeFin;
    });

    if (this.filterStatut) {
      filtered = filtered.filter(contrat => contrat.statut === this.filterStatut);
    }

    this.filteredContrats = filtered;
    this.p = 1; // Réinitialiser la page à 1 après filtration
  }

  setFilterStatut(statut: StatutContrat | ''): void {
    this.filterStatut = statut;
    this.filterContrats();
  }

  resetFilters(): void {
    this.filterDateDebut = '';
    this.filterDateFin = '';
    this.filterStatut = '';
    this.filterContrats();
  }

  openDeletePopup(contrat: Contrat): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le contrat #${contrat.numeroContrat} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteContrat(contrat);
      }
    });
  }

  closePopup(): void {
    this.showPopup = false;
    this.contratToDelete = null;
  }

  deleteContrat(contrat: Contrat): void {
    if (contrat && contrat.id) {
      this.contratService.deleteContrat(contrat.id).subscribe(() => {
        this.contrats = this.contrats.filter(c => c.id !== contrat.id);
        this.filteredContrats = this.filteredContrats.filter(c => c.id !== contrat.id);
        this.closePopup();
      }, error => {
        console.error('Erreur lors de la suppression du contrat:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Erreur lors de la suppression du contrat.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      });
    }
  }

  payContrat(contratId: number): void {
    const contrat = this.contrats.find(c => c.id === contratId);
    
    if (contrat && (contrat.statut === 'InProgress' || contrat.statut === 'PaymentPending')) {
      if (contrat.statut === 'InProgress') {
        contrat.statut = StatutContrat.PaymentPending;
        this.contratService.updateContrat(contratId, contrat).subscribe(
          () => {
            console.log(`✅ Statut du contrat ${contratId} mis à jour à PaymentPending`);
            this.redirectToFacture(contratId);
          },
          error => {
            console.error('❌ Erreur lors de la mise à jour du statut pour paiement:', error);
            Swal.fire({
              title: 'Erreur',
              text: 'Erreur lors de la mise à jour du statut pour le paiement.',
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
          }
        );
      } else {
        this.redirectToFacture(contratId);
      }
    } else {
      console.warn('Le contrat doit être en statut InProgress ou PaymentPending');
    }
  }

  private redirectToFacture(contratId: number): void {
    this.router.navigate(['/factureclient', contratId]);
  }

  viewContrat(contratId: number): void {
    this.router.navigate([`/contrat/${contratId}`]);
  }

  editContrat(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Modifier le contrat',
        text: 'Voulez-vous modifier ce contrat ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Oui, modifier',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/contrat-form2', id]);
        }
      });
    } else {
      Swal.fire('Erreur', 'Contrat ID est indéfini', 'error');
    }
  }

  getTimelineSteps(contrat: Contrat): { label: string; completed: boolean; active: boolean }[] {
    return [
      { label: 'En cours', completed: contrat.statut === 'InProgress' || contrat.statut === 'PaymentPending' || contrat.statut === 'ACTIVE', active: contrat.statut === 'InProgress' },
      { label: 'Paiement', completed: contrat.statut === 'PaymentPending' || contrat.statut === 'ACTIVE', active: contrat.statut === 'PaymentPending' },
      { label: 'Actif', completed: contrat.statut === 'ACTIVE', active: contrat.statut === 'ACTIVE' }
    ];
  }
}