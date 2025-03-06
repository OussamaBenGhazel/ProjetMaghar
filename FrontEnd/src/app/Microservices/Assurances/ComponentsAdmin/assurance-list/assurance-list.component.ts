import { Component, OnInit } from '@angular/core';
import { Assurance } from 'src/app/core/models/assurance.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver'; // Importation corrigée pour file-saver

@Component({
  selector: 'app-assurance-list',
  templateUrl: './assurance-list.component.html',
  styleUrls: ['./assurance-list.component.css']
})
export class AssuranceListComponent implements OnInit {
  assurances: Assurance[] = [];
  filteredAssurances: Assurance[] = [];
  selectedType: string | null = null;
  selectedAssurance: Assurance | null = null;
  showDetailsModal: boolean = false;
  selectedAssurances: Set<number> = new Set<number>(); // Pour les actions par lots
  p: number = 1; // Page actuelle pour la pagination
  itemsPerPage: number = 5; // Nombre d'éléments par page

  constructor(private assuranceService: AssuranceService, private router: Router) {}

  ngOnInit(): void {
    this.loadAssurances();
  }

  loadAssurances(): void {
    this.assuranceService.getAllAssurances().subscribe(
      (data: Assurance[]) => {
        this.assurances = data;
        this.filteredAssurances = [...this.assurances];
      },
      (error) => {
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors du chargement des assurances.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  // Filtrer par type
  filterByType(type: string): void {
    this.selectedType = type;
    if (type === null) {
      this.filteredAssurances = this.assurances;
    } else {
      this.assuranceService.getAssurancesByType(type).subscribe(
        (data) => {
          this.filteredAssurances = data;
          this.p = 1; // Réinitialiser la page à 1 après filtrage
        },
        (error) => {
          Swal.fire({
            title: 'Erreur',
            text: `Erreur lors du filtrage par type: ${type}`,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  // Réinitialiser le filtre
  resetFilter(): void {
    this.selectedType = null;
    this.filteredAssurances = this.assurances;
    this.p = 1; // Réinitialiser la page à 1
  }

  // Modifier le statut d'une assurance
  updateStatus(assuranceId: number, newStatus: string): void {
    const assurance = this.assurances.find(a => a.id === assuranceId);
    if (assurance) {
      Swal.fire({
        title: 'Changer le statut ?',
        text: `Voulez-vous définir le statut de "${assurance.nom}" à "${newStatus}" ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          assurance.statut = newStatus;
          this.assuranceService.updateAssurance(assuranceId, assurance).subscribe(
            () => {
              Swal.fire({
                title: 'Succès',
                text: 'Statut mis à jour avec succès',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              });
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du statut:', error);
              Swal.fire({
                title: 'Erreur',
                text: 'Échec de la mise à jour du statut.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
              });
            }
          );
        }
      });
    }
  }

  // Ouvrir le modal des détails
  showDetails(assurance: Assurance): void {
    this.selectedAssurance = assurance;
    this.showDetailsModal = true;
  }

  // Fermer le modal
  closeDetails(): void {
    this.showDetailsModal = false;
    this.selectedAssurance = null;
  }

  // Gérer la sélection/désélection d'une assurance
  toggleSelection(assuranceId: number): void {
    if (this.selectedAssurances.has(assuranceId)) {
      this.selectedAssurances.delete(assuranceId);
    } else {
      this.selectedAssurances.add(assuranceId);
    }
  }

  // Exporter les assurances sélectionnées en CSV
  exportToCSV(): void {
    if (this.selectedAssurances.size === 0) {
      Swal.fire({
        title: 'Avertissement',
        text: 'Veuillez sélectionner au moins une assurance.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return;
    }

    const selectedAssurancesData = this.assurances.filter(a => this.selectedAssurances.has(a.id!));
    const csvContent = this.convertToCSV(selectedAssurancesData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'assurances_export.csv');
    Swal.fire({
      title: 'Succès',
      text: 'Exportation en CSV effectuée avec succès.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  // Convertir les données en format CSV
  private convertToCSV(assurances: Assurance[]): string {
    const headers = ['ID, Nom, Type, Montant Assuré (DT), Prime (DT), Statut\n'];
    const rows = assurances.map(a => 
      `${a.id}, "${a.nom}", ${a.type}, ${a.montantAssure}, ${a.prime}, ${a.statut}`
    );
    return headers.concat(rows).join('\n');
  }

  // Rediriger vers le formulaire de modification
  editAssurance(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/admin/assurance-form', id]);
    } else {
      Swal.fire({
        title: 'Erreur',
        text: 'Assurance ID est indéfini.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  }

  // Supprimer une assurance
  deleteAssurance(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cette assurance ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assuranceService.deleteAssurance(id).subscribe(
          () => {
            this.assurances = this.assurances.filter(assurance => assurance.id !== id);
            this.filteredAssurances = this.filteredAssurances.filter(assurance => assurance.id !== id);
            Swal.fire({
              title: 'Succès',
              text: 'Assurance supprimée avec succès.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            console.error('Erreur lors de la suppression:', error);
            Swal.fire({
              title: 'Erreur',
              text: 'Échec de la suppression de l\'assurance.',
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }

  // Naviguer vers l'ajout d'une assurance
  navigateToAddAssurance(): void {
    this.router.navigate(['/admin/assurance-form']);
  }
}