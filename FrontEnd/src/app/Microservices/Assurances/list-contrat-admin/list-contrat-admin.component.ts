import { Component, OnInit } from '@angular/core';
import { Contrat } from 'src/app/core/models/Contrat.model';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service';

@Component({
  selector: 'app-list-contrat-admin',
  templateUrl: './list-contrat-admin.component.html',
  styleUrls: ['./list-contrat-admin.component.css']
})
export class ListContratAdminComponent implements OnInit {
viewDetails(arg0: number|undefined) {
throw new Error('Method not implemented.');
}
  
  contrats: Contrat[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  // Charger la liste des contrats
  loadContrats(): void {
    this.contratService.getAllContrats().subscribe(
      (data: Contrat[]) => {
        this.contrats = data;
        this.isLoading = false;
      },
      error => {
        console.error('❌ Erreur lors du chargement des contrats:', error);
        this.errorMessage = "Erreur lors du chargement des contrats.";
        this.isLoading = false;
      }
    );
  }

  // Supprimer un contrat
  deleteContrat(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce contrat ?")) {
      this.contratService.deleteContrat(id).subscribe(() => {
        this.contrats = this.contrats.filter(c => c.id !== id);
        console.log(`✅ Contrat ${id} supprimé`);
      }, error => {
        console.error('❌ Erreur lors de la suppression du contrat:', error);
      });
    }
  }
}
