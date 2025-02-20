import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from 'src/app/core/models/Contrat.model';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = ' http://localhost:8081/api/contrats'; // URI de l'API

  constructor(private http: HttpClient) { }

  // Créer un contrat
  createContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(this.apiUrl, contrat);
  }

  // Mettre à jour un contrat
  updateContrat(id: number, contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/${id}`, contrat);
  }

  // Supprimer un contrat
  deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtenir tous les contrats
  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(this.apiUrl);
  }

  // Obtenir un contrat par son ID
  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/${id}`);
  }

  // Créer un contrat à partir d'une assurance
  createContratFromAssurance(assuranceId: number, contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiUrl}/from-assurance/${assuranceId}`, contrat);
  }

  // Créer un contrat à partir d'un devis
  createContratFromDevis(devisId: number, contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiUrl}/from-devis/${devisId}`, contrat);
  }
}

