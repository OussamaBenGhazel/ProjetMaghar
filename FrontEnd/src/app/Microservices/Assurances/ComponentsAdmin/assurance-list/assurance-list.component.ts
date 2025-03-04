import { Component, OnInit } from "@angular/core";
import { Assurance } from "src/app/core/models/assurance.model";
import { AssuranceService } from "src/app/services/Assurance-service/assurance.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-assurance-list',
  templateUrl: './assurance-list.component.html',
  styleUrls: ['./assurance-list.component.css']
})
export class AssuranceListComponent implements OnInit {

  assurances: Assurance[] = [];
  filteredAssurances: Assurance[] = [];
  selectedType: string | null = null;
  
  constructor(private assuranceService: AssuranceService, private router: Router) { }

  ngOnInit(): void {
    this.loadAssurances();
  }

  loadAssurances(): void {
    this.assuranceService.getAllAssurances().subscribe((data: Assurance[]) => {
      this.assurances = data;
      this.filteredAssurances = data;
    });
  }
  
  // Nouvelle méthode pour filtrer par type
  filterByType(type: string): void {
    this.selectedType = type;
    
    if (type === null) {
      this.filteredAssurances = this.assurances;
    } else {
      this.assuranceService.getAssurancesByType(type).subscribe(
        (data) => {
          this.filteredAssurances = data;
        },
        (error) => {
          console.error(`Erreur lors du filtrage par type: ${type}`, error);
        }
      );
    }
  }
  
  // Méthode pour réinitialiser le filtre
  resetFilter(): void {
    this.selectedType = null;
    this.filteredAssurances = this.assurances;
  }
  
  // Méthode pour rediriger vers le formulaire de modification avec l'ID de l'assurance
  editAssurance(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/admin/assurance-form', id]); // Redirige vers /admin/assurance-form/{id}
    } else {
      console.error('Assurance ID is undefined');
    }
  }
  
  deleteAssurance(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette assurance ?')) {
      this.assuranceService.deleteAssurance(id).subscribe(() => {
        this.assurances = this.assurances.filter(assurance => assurance.id !== id);
        this.filteredAssurances = this.filteredAssurances.filter(assurance => assurance.id !== id);
      });
    }
  }

  navigateToAddAssurance(): void {
    this.router.navigate(['/admin/assurance-form']);
  }
}