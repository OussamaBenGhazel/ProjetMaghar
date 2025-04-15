import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OffreEmploi } from '../models/offre-emploi';  // Assurez-vous que le modèle est importé

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {
  private apiUrl = 'http://localhost:8085/inesk/offres';  // URL du backend

  constructor(private http: HttpClient) { }
  getOffreById(id: number): Observable<OffreEmploi> {
    return this.http.get<OffreEmploi>(`${this.apiUrl}/${id}`);
  }
  // Méthode pour créer une nouvelle offre d'emploi
  createOffreEmploi(offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(this.apiUrl, offreEmploi);
  }

  // Méthode pour récupérer toutes les offres d'emploi
  getAllOffresEmploi(): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(this.apiUrl);
  }

  // Méthode pour récupérer une offre d'emploi par son ID
  getOffreEmploiById(id: number): Observable<OffreEmploi> {
    return this.http.get<OffreEmploi>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour mettre à jour une offre d'emploi
  updateOffreEmploi(id: number, offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    return this.http.put<OffreEmploi>(`${this.apiUrl}/${id}`, offreEmploi);
  }

  // Méthode pour supprimer une offre d'emploi
  deleteOffreEmploi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
