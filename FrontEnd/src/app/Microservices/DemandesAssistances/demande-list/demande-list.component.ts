import { Component, OnInit } from '@angular/core';
import { DemandeAssistanceService } from 'src/app/services/DemandeAssistance-Service/demandeassistance.service';
import { DemandeAssistance } from 'src/app/core/models/reclamation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  demandesAssistance: DemandeAssistance[] = [];
  filteredDemandes: DemandeAssistance[] = []; 
  searchTerm: string = ''; 
  p: number = 1; 
  itemsPerPage: number = 6; 

  constructor(
    private demandeAssistanceService: DemandeAssistanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes() {
    this.demandeAssistanceService.getDemandesAssistance().subscribe(
      (data: DemandeAssistance[]) => {
        console.log("Données reçues du backend :", data);
        this.demandesAssistance = data;
        this.filteredDemandes = data; 
      },
      (error: HttpErrorResponse) => {
        console.error("Erreur lors du chargement des demandes :", error);
      }
    );
  }

  filterDemandes() {
    this.filteredDemandes = this.demandesAssistance.filter(demande =>
      demande.clientName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      demande.assistanceType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demande.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteDemandeAssistance(id: number | undefined) {
    if (id !== undefined && id !== null) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette demande d'assistance ?")) {
        this.demandeAssistanceService.deleteDemandeAssistance(id).subscribe(
          () => {
            console.log('Demande supprimée');
            this.loadDemandes();
          },
          (error: HttpErrorResponse) => {
            console.error('Erreur lors de la suppression de la demande :', error);
          }
        );
      }
    } else {
      console.error("ID de la demande invalide");
    }
  }

  navigateToEdit(id: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate([`/demandes-assistance/edit/${id}`]);
    }
  }

  navigateToCreate() {
    this.router.navigate(['/demandes-assistance/create']);
  }
}
