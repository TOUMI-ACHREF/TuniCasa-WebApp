import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   //the correct format of the request to access the api
    httpOptions={ 
      headers:new HttpHeaders({'Content-Type':'application/json'}), 
      withCredentials: true 
    }; 
  //, private processHTTPMsgService : ProcessHttpmsgService (i should add this to hundle msgs from the backend) 
    constructor(private http: HttpClient,  @Inject('BaseURL')private baseUrl:string) { }
  
    //private apiUrl = 'http://localhost:8087/api/estates';
  
    getUsers() {
      return this.http.get<any[]>(this.baseUrl + '/profile', this.httpOptions);  
    }
    getUserById(id: number) {
      return this.http.get<any>(this.baseUrl+'/profile/'+id, this.httpOptions);
    }
  
    deleteUser(id: number): Observable<void> {return this.http.delete<void>(this.baseUrl+"/profile/" + id, this.httpOptions);}
   
    updateUser(user: User): Observable<User> {
      return this.http.put<User>(this.baseUrl +"/profile/"+ user.id, user, this.httpOptions)
    }
  
    getLastUser(): Observable<User> {
      return this.getUsers().pipe(
        map((users: User[]) => users[users.length - 1]) 
      );
    }
    
}