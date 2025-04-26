import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  //the correct format of the request to access the api
  httpOptions={ 
    headers:new HttpHeaders({'Content-Type':'application/json'}), 
    withCredentials: true 
  }; 

  constructor(private http: HttpClient, @Inject('BaseURL')private baseUrl:string) {}

  // Add estate to favorites
  addFavorite(userId: number, estateId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    // Adding `/favorites` to the URL path
    return this.http.post(`${this.baseUrl}/favorites/${estateId}`, null, { params, withCredentials: true });
  }

  // Remove estate from favorites
  removeFavorite(userId: number, estateId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    // Adding `/favorites` to the URL path
    return this.http.delete(`${this.baseUrl}/favorites/${estateId}`, { params, withCredentials: true });
  }

  // Get all favorites for a user
  getFavorites(userId: number): Observable<any[]> {
    // Adding `/favorites` to the URL path
    return this.http.get<any[]>(`${this.baseUrl}/favorites/user/${userId}`, { withCredentials: true });
  }

}
