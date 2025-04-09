import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partenaire } from 'src/app/core/models/partenaire.model';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  private apiUrl = 'http://localhost:8081/partenaire-service/api/partenaires';

  constructor(private http: HttpClient) {}

  addPartenaire(partenaire: Partenaire): Observable<Partenaire> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Partenaire>(this.apiUrl, partenaire, { headers });
  }

  getAllPartenaires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getPartenaireById(id: number): Observable<Partenaire> {
    return this.http.get<Partenaire>(`${this.apiUrl}/${id}`);
  }

  updatePartenaire(id: number, partenaire: Partenaire): Observable<Partenaire> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Partenaire>(`${this.apiUrl}/${id}`, partenaire, { headers });
  }

  deletePartenaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
