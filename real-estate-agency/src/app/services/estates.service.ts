import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EstateService {
  private apiUrl = 'http://localhost:8087/api/estates';
  constructor(private http: HttpClient) {}

  getEstates() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getEstateById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getSugg() {
    return this.http.get<any>(`${this.apiUrl}/suggested`);
  }
  getFilteredEstates(filters: {
    status?: string;
    type?: string;
    rooms?: string;
    priceMin?: string;
    priceMax?: string;
    city?: string;
  }) {
    const params = new HttpParams({ fromObject: filters });
  
    return this.http.get<any>(`${this.apiUrl}/filter`, { params });
  }

  searchEstates(keyword: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {params: { keyword }});
  }
  
}
