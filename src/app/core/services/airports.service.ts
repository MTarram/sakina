import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  private baseUrl = 'https://test.api.amadeus.com/v1/reference-data/locations';

  constructor(private http: HttpClient) {}

  searchLocations(query: string): Observable<any> {
    const params = {
      subType: 'CITY',
      keyword: query,
      'page[limit]': '10',
      'page[offset]': '0',
      sort: 'analytics.travelers.score',
      view: 'FULL',
    };

    const headers = new HttpHeaders({
      Authorization: 'Bearer XAiST8ie1w3B4BcSCZap9hJwAa6e',
    });

    return this.http.get(this.baseUrl, { params, headers });
  }
}
