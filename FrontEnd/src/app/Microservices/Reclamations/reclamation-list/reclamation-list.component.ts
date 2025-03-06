import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/Reclamation-Service/reclamation.service'; 
import { Reclamation } from 'src/app/core/models/reclamation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.css']
})
export class ReclamationListComponent implements OnInit {
  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = []; 
  searchTerm: string = ''; 
  p: number = 1;
  itemsPerPage: number = 6; 

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations() {
    this.reclamationService.getReclamations().subscribe(
      (data: Reclamation[]) => {
        console.log("Données reçues du backend :", data); 
        this.reclamations = data;
        this.filterReclamations();
      },
      (error: HttpErrorResponse) => {
        console.error("Erreur lors du chargement des réclamations :", error);
      }
    );
  }

  filterReclamations() {
    if (!this.searchTerm) {
      this.filteredReclamations = this.reclamations; 
    } else {
      this.filteredReclamations = this.reclamations.filter(reclamation =>
        (reclamation.clientName?.toLowerCase().includes(this.searchTerm.toLowerCase())) || 
        (reclamation.description?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (reclamation.statut?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (reclamation.typeReclamation?.toLowerCase().includes(this.searchTerm.toLowerCase())) || 
        (reclamation.titre?.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }
  

  deleteReclamation(id: number | undefined) {
    if (id !== undefined && id !== null) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?")) {
        this.reclamationService.deleteReclamation(id).subscribe(
          () => {
            console.log('Réclamation supprimée');
            this.loadReclamations(); 
          },
          (error: HttpErrorResponse) => {
            console.error('Erreur lors de la suppression de la réclamation :', error);
          }
        );
      }
    } else {
      console.error("ID de la réclamation invalide");
    }
  }

  navigateToEdit(id: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate([`/reclamations/edit/${id}`]);
    }
  }

  navigateToCreate() {
    this.router.navigate(['/reclamations/create']);
  }
}
