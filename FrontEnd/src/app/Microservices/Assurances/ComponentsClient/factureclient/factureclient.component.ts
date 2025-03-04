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
  facture: Facture | null = null;  // La facture sera soit null, soit un objet Facture
  factureNotFound: boolean = false;  // Indicateur pour savoir si la facture existe ou non

  constructor(
    private activatedRoute: ActivatedRoute,
    private factureService: FactureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du contrat depuis l'URL
    this.activatedRoute.params.subscribe(params => {
      const contratId = +params['contratId']; // Le + pour convertir en number
      this.loadFacture(contratId);
    });
  }

  // Fonction pour charger la facture depuis le service
  loadFacture(contratId: number): void {
    this.factureService.createFactureFromContrat(contratId).subscribe(
      (facture) => {
        if (facture) {
          this.facture = facture;  // Si une facture est trouvée, on l'affiche
          this.factureNotFound = false;  // Facture trouvée
        } else {
          this.factureNotFound = true;  // Facture non trouvée
        }
      },
      (error) => {
        console.error('Erreur lors du chargement de la facture:', error);
        alert("Erreur lors du chargement de la facture.");
      }
    );
  }

  // Fonction pour payer la facture
  payFacture(factureId: number): void {
    console.log('Paiement en cours pour la facture ID:', factureId);
    this.router.navigate(['/confirmation', factureId]);
  }
}
