import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estate } from '../models/estate.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EstateService {
  //the correct format of the request to access the api
  httpOptions={ 
    headers:new HttpHeaders({'Content-Type':'application/json'}), 
    withCredentials: true 
  }; 
//, private processHTTPMsgService : ProcessHttpmsgService (i should add this to hundle msgs from the backend) 
  constructor(private http: HttpClient,  @Inject('BaseURL')private baseUrl:string) { }

  //private apiUrl = 'http://localhost:8087/api/estates';

  getEstates() {
    return this.http.get<any[]>(this.baseUrl + '/estates',{withCredentials:true});  
  }
  getEstateById(id: number) {
    return this.http.get<any>(this.baseUrl+'/estates/'+id, {withCredentials:true});
  }
  getSugg() {
    return this.http.get<any>(this.baseUrl+'/estates/suggested', {withCredentials:true});
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
  
    return this.http.get<any>(this.baseUrl+'/estates/filter', {params: params, withCredentials:true});
  }

  searchEstates(keyword: string) {
    const params = new HttpParams().set('keyword', keyword);
    console.log("Search params:", params.toString());  // Check if the keyword is being sent
    return this.http.get<any[]>(`${this.baseUrl}/estates/search`, {
      params:params,
      withCredentials: true
    });  
  }

  //Méthode pour supprimer un estate de la liste des produits
  deleteEsate(id: number): Observable<void> {return this.http.delete<void>(this.baseUrl +'/estates/'+ id, this.httpOptions);}

  //Méthode pour ajouter un nouveu estate
  addEstate(estate: Estate): Observable<Estate> {
    // Création d'un estate avec l'ID converti en chaîne de caractères juste pour l'envoi
    const estateToSend = { ...estate, id: estate.id! }; 
    return this.http.post<Estate>(this.baseUrl+'/estates', estateToSend, this.httpOptions);
  }
  
  //Méthode pour mettre à jour un  estate
  updateEstate(estate: Estate): Observable<Estate> {
    return this.http.put<Estate>(this.baseUrl +'/estates/'+ estate.id, estate, this.httpOptions)
  }

  getLastEstate(): Observable<Estate> {
    return this.getEstates().pipe(
      map((estates: Estate[]) => estates[estates.length - 1]) // Retourne le dernier estate de la liste
    );
  }

}
