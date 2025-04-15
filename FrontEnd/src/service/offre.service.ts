import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Assure-toi que HttpClient est bien importé
import { Observable } from 'rxjs';  // Assure-toi que RxJS est bien installé

@Injectable({
  providedIn: 'root'  // Cela permet d'utiliser ce service globalement dans l'application
})
export class OffreService {

  constructor(private http: HttpClient) { }

  // Exemple d'une méthode pour récupérer les offres d'emploi
  getAllOffresEmploi(): Observable<any> {
    return this.http.get('http://localhost:8085/inesk/offres');
  }
}
