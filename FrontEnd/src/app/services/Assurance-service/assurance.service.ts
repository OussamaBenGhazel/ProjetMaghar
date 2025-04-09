import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assurance } from 'src/app/core/models/assurance.model';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {

  private baseUrl = 'http://localhost:8099/api/assurances'; // URI de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les assurances
  getAllAssurances(): Observable<Assurance[]> {
    return this.http.get<Assurance[]>(this.baseUrl);
  }

  // Récupérer une assurance par son ID
  getAssuranceById(id: number): Observable<Assurance> {
    return this.http.get<Assurance>(`${this.baseUrl}/${id}`);
  }

  // Créer une nouvelle assurance
  createAssurance(assurance: Assurance): Observable<Assurance> {
    return this.http.post<Assurance>(this.baseUrl, assurance);
  }

  // Mettre à jour une assurance existante
  updateAssurance(id: number, assurance: Assurance): Observable<Assurance> {
    return this.http.put<Assurance>(`${this.baseUrl}/${id}`, assurance);
  }
  // Supprimer une assurance par son ID
  deleteAssurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getAssurancesByType(type: string): Observable<Assurance[]> {
    return this.http.get<Assurance[]>(`${this.baseUrl}/type/${type}`);
  }
}
