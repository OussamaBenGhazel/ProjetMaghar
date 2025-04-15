import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  geocode(location: string): Observable<{ lat: number, lon: number }> {
    return this.http.get<any[]>(`${this.nominatimUrl}?format=json&q=${encodeURIComponent(location)}`)
      .pipe(
        map(results => {
          if (results && results.length > 0) {
            return { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) };
          }
          throw new Error('Localisation non trouvée');
        })
      );
  }
}
