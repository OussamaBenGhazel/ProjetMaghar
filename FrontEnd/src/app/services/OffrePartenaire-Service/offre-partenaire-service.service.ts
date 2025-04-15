// offre-partenaire-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffrePartenaireService {
  private apiUrl = 'http://localhost:8081/partenaire-service/api/offres';  // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les offres
  getAllOffres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter une nouvelle offre
  addOffre(offre: any): Observable<any> {
    return this.http.post(this.apiUrl, offre);
  }

  // Mettre à jour une offre
  updateOffre(id: number, offre: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, offre);
  }

  // Récupérer une offre par son ID
  getOffreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Supprimer une offre
  deleteOffre(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
<<<<<<< HEAD
=======




>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
}
