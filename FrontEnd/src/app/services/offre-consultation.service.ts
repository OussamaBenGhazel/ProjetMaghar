import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Pour les requêtes HTTP
import { Observable } from 'rxjs'; // Pour gérer les observables

@Injectable({
  providedIn: 'root'  // Le service est injectable dans toute l'application
})
export class OffreConsultationService {
  private apiUrl = 'http://localhost:8085/inesk/offres';  // Remplace cette URL par celle de ton API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les offres d'emploi
  getAllOffresEmploi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Envoi de la requête GET
  }
}
