import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Facture, StatutFacture } from 'src/app/core/models/Facture .model';
import { FactureService } from 'src/app/services/Assurance-service/facture.service';

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
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const stripeKey = 'pk_test_51QxDlq02Cle28AVGjZH8eAIZXx9GnM8j7yqtVWPdGuXLfffgLMOWTieQekB6kHgZ5ZGr4Dnbp4iVjAprFpHrPdEa00GrfmI8LP';
    console.log('Clé Stripe utilisée:', stripeKey);
    try {
      this.stripe = await loadStripe(stripeKey);
      if (!this.stripe) {
        console.error('Échec du chargement de Stripe avec la clé fournie');
      } else {
        console.log('Stripe chargé avec succès:', this.stripe);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de Stripe:', error);
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
      return;
    }
    if (!this.facture.id) {
      this.paymentError = 'ID de la facture manquant';
      return;
    }
    if (!this.stripe) {
      this.paymentError = 'Stripe non initialisé';
      return;
    }
    if (!this.elements) {
      this.paymentError = 'Éléments Stripe non initialisés';
      return;
    }
    if (!this.cardElement) {
      this.paymentError = 'Élément de carte Stripe non initialisé';
      return;
    }

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      this.paymentError = error.message || 'Erreur inconnue lors de la création du paiement';
      return;
    }

    this.factureService.processPaymentWithStripe(this.facture.id, paymentMethod.id).subscribe(
      (updatedFacture: Facture) => {
        this.facture = updatedFacture;
        if (updatedFacture.statut === StatutFacture.EN_ATTENTE_CONFIRMATION && updatedFacture.urlPaiement) {
          window.location.href = updatedFacture.urlPaiement;
        } else if (updatedFacture.statut === StatutFacture.PAYEE) {
          alert('Paiement réussi !');
        }
        this.paymentError = null;
      },
      (error: any) => {
        console.error('Erreur lors du paiement:', error);
        this.paymentError = 'Erreur lors du paiement: ' + (error.message || error.error || 'Problème inconnu');
        alert(this.paymentError);
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
          console.warn('Aucune facture trouvée pour contratId:', contratId);
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement de la facture:', error);
        alert('Erreur lors du chargement de la facture.');
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
          link.download = `Facture_${this.facture!.id}.pdf`; // ! pour affirmer que id n'est pas null
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        (error: any) => {
          console.error('Erreur lors du téléchargement de la facture:', error);
          alert('Erreur lors du téléchargement de la facture: ' + (error.message || error.statusText));
        }
      );
    } else {
      this.paymentError = 'Aucune facture disponible pour téléchargement';
    }
  }
}