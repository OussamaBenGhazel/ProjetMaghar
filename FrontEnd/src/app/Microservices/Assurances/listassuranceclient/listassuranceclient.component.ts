import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assurance } from 'src/app/core/models/assurance.model';
import { AssuranceService } from 'src/app/services/Assurance-service/assurance.service';

@Component({
  selector: 'app-listassuranceclient',
  templateUrl: './listassuranceclient.component.html',
  styleUrls: ['./listassuranceclient.component.css']
})
export class ListassuranceclientComponent implements OnInit {

  assurances: Assurance[] = [];
hhhhhhh
  constructor(private assuranceService: AssuranceService, private router: Router) { }

  ngOnInit(): void {
    this.loadAssurances();
  }

  loadAssurances(): void {
    this.assuranceService.getAllAssurances().subscribe((data: Assurance[]) => {
      this.assurances = data;
    });
  }

  // Redirection vers le formulaire de souscription avec l'ID de l'assurance
  subscribeToAssurance(assuranceId: number): void {
    this.router.navigate(['/contrat-form', assuranceId]); // Redirige vers le formulaire avec l'ID de l'assurance
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