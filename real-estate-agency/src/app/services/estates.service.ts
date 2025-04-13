import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EstateService {
  private apiUrl = 'http://localhost:8087/api/estates';
  private query = 'suggested';
  constructor(private http: HttpClient) {}

  getEstates() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getEstateById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getSugg() {
    return this.http.get<any>(`${this.apiUrl}/${this.query}`);
  }
  
}
