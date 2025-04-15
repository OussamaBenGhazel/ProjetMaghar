import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendez-vous.model';

@Injectable({
    providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'http://localhost:8086/inesk/rendezvous';
    constructor(private http: HttpClient) {}

    creerRendezVous(rdv: RendezVous): Observable<RendezVous> {
        console.log("Données envoyées : ", rdv);
        return this.http.post<RendezVous>(this.apiUrl, rdv, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getRendezVousByAgentId(agentId: number): Observable<RendezVous[]> {
        return this.http.get<RendezVous[]>(`${this.apiUrl}/agent/${agentId}`);
    }
}