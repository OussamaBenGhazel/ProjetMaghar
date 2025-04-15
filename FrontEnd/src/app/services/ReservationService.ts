import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8081/partenaire-service/reservations'; // URL de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour créer une réservation
  createReservation(userId: number, offreId: number, reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${userId}/${offreId}`, reservation);
  }
}
