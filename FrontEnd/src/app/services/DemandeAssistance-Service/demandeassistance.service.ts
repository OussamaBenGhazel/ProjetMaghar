import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DemandeAssistance } from 'src/app/core/models/reclamation.model'; 

@Injectable({
  providedIn: 'root'
})
export class DemandeAssistanceService {

  private apiUrl = 'http://localhost:8082/api/demandes-assistance'; 
  private addDemandeUrl = 'http://localhost:8082/api/demandes-assistance/add';

  constructor(private http: HttpClient) { }

 
  getDemandesAssistance(): Observable<DemandeAssistance[]> {
    return this.http.get<DemandeAssistance[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }


  getDemandeAssistanceById(id: number): Observable<DemandeAssistance> {
    if (!id) {
      console.error('Demande ID is invalid');
      return throwError('Invalid Demande ID');
    }

    return this.http.get<DemandeAssistance>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  createDemandeAssistance(demande: DemandeAssistance): Observable<DemandeAssistance> {
   
    return this.http.post<DemandeAssistance>(this.addDemandeUrl, demande)
      .pipe(catchError(this.handleError));
  }

  
  updateDemandeAssistance(demande: DemandeAssistance): Observable<DemandeAssistance> {
    if (!demande.id) {
      console.error('Demande ID is invalid');
      return throwError('Invalid Demande ID');
    }

    return this.http.put<DemandeAssistance>(`${this.apiUrl}/${demande.id}`, demande)
      .pipe(catchError(this.handleError));
  }

  
  deleteDemandeAssistance(id: number): Observable<void> {
    if (!id) {
      console.error('Demande ID is invalid');
      return throwError('Invalid Demande ID');
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

 
  private handleError(error: HttpErrorResponse) {
   
    let errorMessage = 'Something went wrong. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      
      console.error('Client-side error:', error.error.message);
      errorMessage = 'An error occurred while processing your request.';
    } else {
      
      console.error(`Server returned code: ${error.status}, body was: `, error.error);
      if (error.status === 400) {
        errorMessage = 'Invalid request. Please check the entered data.';
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }

    return throwError(errorMessage);
  }
}
