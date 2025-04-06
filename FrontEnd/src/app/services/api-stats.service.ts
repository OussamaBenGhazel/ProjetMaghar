import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiStatsService {
  private apiUrl = 'http://localhost:8080/api/stats'; // Adaptez l'URL

  constructor(private http: HttpClient) {}

  getOfferStats(): Observable<{[key: string]: number}> {
    return this.http.get<{[key: string]: number}>(`${this.apiUrl}/offres-populaires`);
  }

  getAllInsuranceTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types-assurance`);
  }

  getMonthlyStats(): Observable<{[key: string]: number}> {
    return this.http.get<{[key: string]: number}>(`${this.apiUrl}/reservations-par-mois`);
  }
}
