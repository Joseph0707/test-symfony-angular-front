import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../models/country.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }
  fetchCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.URL_BACKEND}bands`);
  }
  fetchCountry(id: any): Observable<Country> {
    return this.http.get<any>(`${environment.URL_BACKEND}`).pipe(
      map((data: any) => data.find((item: any) => parseInt(id) == item.id))
    );
  }
}
