import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reclamation } from 'src/app/core/models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8082/api/reclamations';
  private addReclamationUrl = 'http://localhost:8082/api/reclamations/add';

  constructor(private http: HttpClient) {}

  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.addReclamationUrl, reclamation).pipe(
      catchError(this.handleError)
    );
  }

  updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/${reclamation.id}`, reclamation).pipe(
      catchError(this.handleError)
    );
  }

  getReclamationById(id: number): Observable<Reclamation> {
    if (!id) {
      return throwError('Invalid reclamation ID');
    }

    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteReclamation(id: number): Observable<void> {
    if (!id) {
      return throwError('Invalid reclamation ID');
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateStatut(id: number, statut: string): Observable<Reclamation> {
    if (!id) {
      return throwError('Invalid reclamation ID');
    }

    return this.http.put<Reclamation>(`${this.apiUrl}/${id}/status?statut=${statut}`, null).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please try again later.');
  }
}
