import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from 'src/app/core/models/Contrat.model';

@Injectable({
  providedIn: 'root'
})
export class ContratService {


  private apiUrl = 'http://localhost:8081/contrats'; // L'URL de votre API

  constructor(private http: HttpClient) { }

  // Créer un contrat à partir d'une assurance
  createContratFromAssurance(assuranceId: number, userId: number, contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiUrl}/create-from-assurance/${assuranceId}/${userId}`, contrat);
  }

  // Créer un contrat
  createContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiUrl}/create`, contrat);
  }

  updateContrat(id: number, contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/update/${id}`, contrat);
  }

  // Supprimer un contrat
  deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Récupérer tous les contrats
  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un contrat par son ID
  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/${id}`);
  }

  // Affecter un contrat à un utilisateur
  affecterContratAUtilisateur(contratId: number, userId: number): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/assign/${contratId}/${userId}`, {});
  }

  // Signer un contrat
  signerContrat(id: number, signatureBase64: string): Observable<Contrat> {
    const params = new URLSearchParams();
    params.set('signatureBase64', signatureBase64);
    return this.http.put<Contrat>(`${this.apiUrl}/sign/${id}?${params.toString()}`, {});
  }
}
