import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from '../../Models/Offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreServiceService {

  private apiUrl='http://localhost:8080/api/offres'

  constructor(
    private http:HttpClient
  ) { }


  addOffre(offre:Offre):Observable<HttpResponse<string>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`,offre,{headers,responseType:'text',observe:'response'})
  }

  updateOffre(offre:Offre , offreId:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update/${offreId}`,offre,{headers,responseType:'text',observe:'response'});
  }

  deleteOffre(offreId:number) : Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiUrl}/delete/${offreId}`);
  }

  getOffreById(offreId : number) : Observable<Offre>{
    return this.http.get<Offre>(`${this.apiUrl}/${offreId}`);
  }

  getAllOffres() : Observable<Offre[]>{
    return this.http.get<Offre[]>(`${this.apiUrl}`);
  }


}
