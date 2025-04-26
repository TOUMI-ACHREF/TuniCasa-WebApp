import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 //the correct format of the request to access the api
  httpOptions={ 
    headers:new HttpHeaders({'Content-Type':'application/json'}), 
    withCredentials: true 
  }; 
//, private processHTTPMsgService : ProcessHttpmsgService (i should add this to hundle msgs from the backend) 
  constructor(private http: HttpClient,  @Inject('BaseURL')private baseUrl:string) { }


  getProfile() {
    const userString = localStorage.getItem('authenticated-user');
    const userId = userString ? JSON.parse(userString).id : null;
    console.log("User-ID: ",userId);
    return this.http.get<any>(this.baseUrl + '/profile/'+ userId, {withCredentials:true});  
  }
  
  updateProfile(profile: User): Observable<User> {
    console.log(profile.id);
    return this.http.put<User>(`${this.baseUrl}/profile/${profile.id}`, profile, { withCredentials: true });
  }

  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/profile/${id}`, { withCredentials: true });
  }
}
