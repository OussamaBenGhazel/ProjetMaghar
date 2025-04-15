import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from '../models/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8085/inesk/candidatures';

  constructor(private http: HttpClient) {}

  createCandidature(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getAllCandidaturesWithOffre(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/with-offre`);
  }

  updateCandidature(id: number, candidature: Candidature): Observable<Candidature> {
    return this.http.put<Candidature>(`${this.apiUrl}/${id}`, candidature);
  }

  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}