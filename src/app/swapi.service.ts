import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private apiUrl = 'https://www.swapi.tech/api/';

  constructor(private http: HttpClient) {}


  getRandomPerson(): Observable<any> {
    const id = Math.floor(Math.random() * 83) + 1;
    return this.http.get(`${this.apiUrl}people/${id}`);
  }

  getRandomStarship(): Observable<any> {
    const id = Math.floor(Math.random() * 36) + 1;
    return this.http.get(`${this.apiUrl}starships/${id}`);
  }
}
