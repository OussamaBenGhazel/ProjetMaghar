import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OffreEmploi } from '../models/offre-emploi';

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {

  private apiUrl = 'http://localhost:8085/inesk/offres';  // Modifié pour correspondre à l'URL du backend

  constructor(private http: HttpClient) { }

  // Méthode pour créer une nouvelle offre d'emploi
  createOffreEmploi(offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(this.apiUrl, offreEmploi);
  }

   // Récupérer toutes les offres
   getAllOffresEmploi(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
