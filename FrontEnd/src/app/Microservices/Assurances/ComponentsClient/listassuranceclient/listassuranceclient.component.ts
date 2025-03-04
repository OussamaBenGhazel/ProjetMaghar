
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Assurance } from 'src/app/core/models/assurance.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';

@Component({
  selector: 'app-listassuranceclient',
  templateUrl: './listassuranceclient.component.html',
  styleUrls: ['./listassuranceclient.component.css']
})
export class ListassuranceclientComponent implements OnInit {
  assurances: Assurance[] = [];
  typeFiltre: string = '';
  
  constructor(
    private assuranceService: AssuranceService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    // Écouter les changements de paramètres d'URL
    this.route.queryParams.subscribe(params => {
      const type = params['type'] || '';
      this.typeFiltre = type;
      this.loadAssurances(type);
    });
  }
  
  loadAssurances(type: string = ''): void {
    if (type) {
      // Charger les assurances filtrées par type
      this.assuranceService.getAssurancesByType(type).subscribe((data: Assurance[]) => {
        this.assurances = data;
      });
    } else {
      // Charger toutes les assurances
      this.assuranceService.getAllAssurances().subscribe((data: Assurance[]) => {
        this.assurances = data;
      });
    }
  }
  
  // Redirection vers le formulaire de souscription avec l'ID de l'assurance
  subscribeToAssurance(assuranceId: number): void {
    this.router.navigate(['/contrat-form', assuranceId]);
  }
  
  deleteAssurance(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette assurance ?')) {
      this.assuranceService.deleteAssurance(id).subscribe(() => {
        this.assurances = this.assurances.filter(assurance => assurance.id !== id);
      });
    }
  }
  
  navigateToAddAssurance(): void {
    this.router.navigate(['/admin/assurance-form']);
  }
}