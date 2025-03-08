import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { ContratService } from 'src/app/services/Assurance-service/contrat.service'; // Importer ContratService
import { StatutContrat } from 'src/app/core/models/Contrat.model'; // Importer StatutContrat
import { FactureService } from 'src/app/services/Assurance-service/facture.service';
import Swal from 'sweetalert2';
import { Facture, StatutFacture } from 'src/app/core/models/Facture .model';

@Component({
  selector: 'app-factureclient',
  templateUrl: './factureclient.component.html',
  styleUrls: ['./factureclient.component.css']
})
export class FactureclientComponent implements OnInit, AfterViewInit {
  facture: Facture | null = null;
  factureNotFound: boolean = false;
  contratId: number | null = null;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: any;
  paymentError: string | null | undefined = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private factureService: FactureService,
    private contratService: ContratService, // Ajouter ContratService
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const stripeKey = 'pk_test_51QxDlq02Cle28AVGjZH8eAIZXx9GnM8j7yqtVWPdGuXLfffgLMOWTieQekB6kHgZ5ZGr4Dnbp4iVjAprFpHrPdEa00GrfmI8LP';
    console.log('Clé Stripe utilisée:', stripeKey);
    try {
      this.stripe = await loadStripe(stripeKey);
      if (!this.stripe) {
        console.error('Échec du chargement de Stripe avec la clé fournie');
        Swal.fire({
          title: 'Erreur',
          text: 'Échec du chargement de Stripe. Veuillez réessayer.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      } else {
        console.log('Stripe chargé avec succès:', this.stripe);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de Stripe:', error);
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors du chargement de Stripe.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
    this.activatedRoute.params.subscribe(params => {
      this.contratId = +params['contratId'];
      this.loadFacture(this.contratId);
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit appelé, vérification de #card-element:', document.getElementById('card-element'), 'stripe:', this.stripe);
    this.setupStripeElements();
    setTimeout(() => this.setupStripeElements(), 100); // Tentative de rechargement
  }

  setupStripeElements(): void {
    if (!this.stripe) {
      console.error('Stripe n\'est pas chargé, impossible d\'initialiser les éléments au moment de l\'appel', this.stripe);
      return;
    }
    console.log('Initialisation des éléments Stripe avec stripe:', this.stripe);
    try {
      this.elements = this.stripe.elements();
      if (!this.elements) {
        console.error('Échec de la création des éléments Stripe avec stripe:', this.stripe);
        return;
      }
      const cardElementDiv = document.getElementById('card-element');
      if (!cardElementDiv) {
        console.error('Élément #card-element non trouvé dans le DOM');
        return;
      }
      this.cardElement = this.elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
          }
        }
      });
      this.cardElement.mount(cardElementDiv);
      console.log('Élément de carte créé et monté:', this.cardElement);
      if (!this.cardElement._frame || !this.cardElement._frame.contentWindow) {
        console.error('Montage de cardElement a échoué');
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des éléments Stripe:', error);
    }
  }

  async pay(): Promise<void> {
    console.log('Tentative de paiement - facture:', this.facture, 'stripe:', this.stripe, 'elements:', this.elements, 'cardElement:', this.cardElement);
    if (!this.facture) {
      this.paymentError = 'Aucune facture chargée';
      Swal.fire({
        title: 'Erreur',
        text: 'Aucune facture chargée.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!this.facture.id) {
      this.paymentError = 'ID de la facture manquant';
      Swal.fire({
        title: 'Erreur',
        text: 'ID de la facture manquant.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!this.stripe) {
      this.paymentError = 'Stripe non initialisé';
      Swal.fire({
        title: 'Erreur',
        text: 'Stripe n\'est pas initialisé.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!this.elements) {
      this.paymentError = 'Éléments Stripe non initialisés';
      Swal.fire({
        title: 'Erreur',
        text: 'Éléments Stripe non initialisés.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!this.cardElement) {
      this.paymentError = 'Élément de carte Stripe non initialisé';
      Swal.fire({
        title: 'Erreur',
        text: 'Élément de carte Stripe non initialisé.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      this.paymentError = error.message || 'Erreur inconnue lors de la création du paiement';
      Swal.fire({
        title: 'Erreur de paiement',
        text: this.paymentError,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.factureService.processPaymentWithStripe(this.facture.id, paymentMethod.id).subscribe(
      (updatedFacture: Facture) => {
        this.facture = updatedFacture;
        if (updatedFacture.statut === StatutFacture.EN_ATTENTE_CONFIRMATION && updatedFacture.urlPaiement) {
          Swal.fire({
            title: 'Paiement en attente',
            text: 'Redirection vers le portail de paiement...',
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
          });
        } else if (updatedFacture.statut === StatutFacture.PAYEE) {
          // Paiement réussi : mettre à jour le statut du contrat à ACTIVE
          if (this.contratId) {
            this.contratService.getContratById(this.contratId).subscribe(
              (contrat) => {
                if (contrat) {
                  contrat.statut = StatutContrat.ACTIVE;
                  this.contratService.updateContrat(this.contratId!, contrat).subscribe(
                    () => {
                      console.log(`✅ Statut du contrat ${this.contratId} mis à jour à ACTIVE`);
                      Swal.fire({
                        title: 'Succès',
                        text: 'Paiement réussi ! Le contrat est maintenant actif.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Retour à la liste des contrats'
                      }).then(() => {
                        // Rediriger vers la liste des contrats après le paiement
                        this.router.navigate(['/ packages']);
                      });
                    },
                    (error) => {
                      console.error('❌ Erreur lors de la mise à jour du statut du contrat:', error);
                      Swal.fire({
                        title: 'Erreur',
                        text: 'Erreur lors de la mise à jour du statut du contrat.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                      });
                    }
                  );
                }
              },
              (error) => {
                console.error('❌ Erreur lors de la récupération du contrat:', error);
              }
            );
          }
        }
        this.paymentError = null;
      },
      (error: any) => {
        console.error('Erreur lors du paiement:', error);
        this.paymentError = 'Erreur lors du paiement: ' + (error.message || error.error || 'Problème inconnu');
        Swal.fire({
          title: 'Erreur',
          text: this.paymentError,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  loadFacture(contratId: number): void {
    this.factureService.createFactureFromContrat(contratId).subscribe(
      (facture: Facture) => {
        if (facture) {
          this.facture = facture;
          console.log('Facture chargée:', facture);
          this.factureNotFound = false;
        } else {
          this.factureNotFound = true;
          Swal.fire({
            title: 'Avertissement',
            text: 'Aucune facture trouvée pour ce contrat.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement de la facture:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Erreur lors du chargement de la facture.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  downloadFacture(): void {
    if (this.facture && this.facture.id) {
      console.log('Téléchargement de la facture avec ID:', this.facture.id);
      this.factureService.downloadFacture(this.facture.id).subscribe(
        (file: Blob) => {
          const blob = new Blob([file], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `Facture_${this.facture!.id}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          Swal.fire({
            title: 'Succès',
            text: 'Facture téléchargée avec succès.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        },
        (error: any) => {
          console.error('Erreur lors du téléchargement de la facture:', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Erreur lors du téléchargement de la facture: ' + (error.message || error.statusText),
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      this.paymentError = 'Aucune facture disponible pour téléchargement';
      Swal.fire({
        title: 'Erreur',
        text: 'Aucune facture disponible pour téléchargement.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  }
}