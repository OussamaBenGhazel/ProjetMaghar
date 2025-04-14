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
  p: number = 1;  // Pagination variable
  itemsPerPage: number = 6; // Items per page for pagination

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  // Fetch all reclamations from the service
  loadReclamations() {
    this.reclamationService.getReclamations().subscribe(
      (data: Reclamation[]) => {
        console.log("Données reçues du backend :", data);
        this.reclamations = data;
        this.filterReclamations();  // Initial filtering
      },
      (error: HttpErrorResponse) => {
        console.error("Erreur lors du chargement des réclamations :", error);
      }
    );
  }

  // Filter reclamations based on search term
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

  // Handle deletion of reclamation
  deleteReclamation(id: number | undefined) {
    if (id != null) { // Ensure id is not null or undefined
      if (confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?")) {
        this.reclamationService.deleteReclamation(id).subscribe(
          () => {
            console.log('Réclamation supprimée');
            this.loadReclamations();  // Reload reclamations after deletion
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

  // Navigate to the edit page for a specific reclamation
  navigateToEdit(id: number | undefined) {
    if (id != null) { // Ensure id is not null or undefined
      this.router.navigate([`/admin/reclamations/edit/${id}`]);
    } else {
      console.error("ID de la réclamation invalide");
    }
  }

  // Navigate to the create page for a new reclamation
  navigateToCreate() {
    this.router.navigate(['/admin/reclamations/create']);
  }
}

