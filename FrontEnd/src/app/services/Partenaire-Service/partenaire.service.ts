import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partenaire } from '../../core/models/partenaire.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  private apiUrl = 'http://localhost:8086/partenaire-service/api/partenaires';

  constructor(private http: HttpClient) {}

  // Ajouter un Partenaire
  addPartenaire(partenaire: Partenaire): Observable<Partenaire> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Partenaire>(this.apiUrl, partenaire, { headers });
  }

  // Obtenir tous les Partenaires
  getAllPartenaires(): Observable<Partenaire[]> {
    return this.http.get<Partenaire[]>(this.apiUrl);
  }

  // Obtenir un Partenaire par ID
  getPartenaireById(id: number): Observable<Partenaire> {
    return this.http.get<Partenaire>(`${this.apiUrl}/${id}`);
  }

  // Modifier un Partenaire
  updatePartenaire(id: number, partenaire: Partenaire): Observable<Partenaire> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Partenaire>(`${this.apiUrl}/${id}`, partenaire, { headers });
  }

  // Supprimer un Partenaire
  deletePartenaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
