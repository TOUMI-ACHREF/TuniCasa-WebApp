import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ActivityLog {
  id: number;
  eventType: string;
  username: string;
  timestamp: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  //the correct format of the request to access the api
    httpOptions={ 
      headers:new HttpHeaders({'Content-Type':'application/json'}), 
      withCredentials: true 
    }; 
  constructor(private http: HttpClient,  @Inject('BaseURL')private baseUrl:string) { }


  getLogs(): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(this.baseUrl+"/logs", this.httpOptions);
  }
}