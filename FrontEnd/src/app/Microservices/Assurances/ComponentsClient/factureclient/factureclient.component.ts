import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/core/models/Facture .model';
import { FactureService } from 'src/app/services/Assurance-service/facture.service';

@Component({
  selector: 'app-factureclient',
  templateUrl: './factureclient.component.html',
  styleUrls: ['./factureclient.component.css']
})
export class FactureclientComponent implements OnInit {
  facture: Facture | null = null;
  factureNotFound: boolean = false;
  contratId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private factureService: FactureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.contratId = +params['contratId'];
      this.loadFacture(this.contratId);
    });
  }

  loadFacture(contratId: number): void {
    this.factureService.createFactureFromContrat(contratId).subscribe(
      (facture) => {
        if (facture) {
          this.facture = facture;
          this.factureNotFound = false;
        } else {
          this.factureNotFound = true;
        }
      },
      (error) => {
        console.error('Erreur lors du chargement de la facture:', error);
        alert("Erreur lors du chargement de la facture.");
      }
    );
  }
  downloadFacture(): void {
    if (this.facture && this.facture.id) {
      this.factureService.downloadFacture(this.facture.id).subscribe(
        (file) => {
          const blob = new Blob([file], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `Facture_${this.facture!.id}.pdf`; // Ajout de "!"
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        (error) => {
          console.error('Erreur lors du téléchargement de la facture:', error);
          alert('Erreur lors du téléchargement de la facture.');
        }
      );
    }
  }
} 