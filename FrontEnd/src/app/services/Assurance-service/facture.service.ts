import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/core/models/Facture .model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:8081/api/factures'; // Adapter selon l'environnement

  constructor(private http: HttpClient) {}

 // Appel pour créer une facture à partir d'un contrat
 createFactureFromContrat(contratId: number): Observable<Facture> {
  return this.http.post<Facture>(`${this.apiUrl}/create/${contratId}`, {});
}

  // ✅ Effectuer un paiement avec Stripe
  payFacture(factureId: number, paymentMethodId: string): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/pay/${factureId}`, {}, {
      params: { paymentMethodId }
    });
  }

  // ✅ Récupérer une facture par ID
  getFactureById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${id}`);
  }

  // ✅ Télécharger une facture en PDF
  downloadFacture(factureId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${factureId}`, {
      responseType: 'blob' // ⬅️ Assure le bon format du fichier
    });
  }

  // ✅ Générer une facture pour un contrat donné
  generateFacture(contratId: number): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/generate/${contratId}`, {});
  }
}
