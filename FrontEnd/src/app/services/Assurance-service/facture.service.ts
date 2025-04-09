import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/core/models/Facture .model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:8087/api/factures'; // Adapter selon l'environnement

  constructor(private http: HttpClient) {}

  // Appel pour créer une facture à partir d'un contrat
  createFactureFromContrat(contratId: number): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/create/${contratId}`, {});
  }

  // Effectuer un paiement avec Stripe
  processPaymentWithStripe(factureId: number, paymentMethodId: string): Observable<Facture> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { paymentMethodId }; // Correspond à la classe PaymentRequest du backend
    return this.http.post<Facture>(`${this.apiUrl}/${factureId}/pay`, body, { headers });
  }

  // Confirmer un paiement Stripe
  confirmStripePayment(factureId: number): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/${factureId}/confirm`, {});
  }

  // Récupérer une facture par ID
  getFactureById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${id}`);
  }

  // Télécharger une facture en PDF
  downloadFacture(factureId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${factureId}/download`, {
      responseType: 'blob' // Assure le bon format du fichier
    });
  }

  // Générer une facture pour un contrat donné (si implémenté dans le backend)
  generateFacture(contratId: number): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/generate/${contratId}`, {});
  }


  // Nouvelle méthode pour récupérer toutes les factures
  getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}`);
  }
}
