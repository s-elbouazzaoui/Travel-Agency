import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Roles} from '../../Models/Roles.model';
import {Observable} from 'rxjs';
import {Reservation} from '../../Models/Reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl='http://localhost:8080/api/reservations';

  constructor(private http :HttpClient) { }

  addRes(reservation:Reservation):Observable<HttpResponse<string>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`,reservation,{headers,responseType:'text',observe:'response'})
  }

  updateRes(res:Reservation , resId:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update/${resId}`,res,{headers,responseType:'text',observe:'response'});
  }

  deleteRes(resId:number) : Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiUrl}/delete/${resId}`);
  }

  getResById(resId : number) : Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiUrl}/${resId}`);
  }

  validateRes(id:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/approve/${id}`,{},{headers,responseType:'text',observe:'response'});
  }

  rejectRes(id:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/reject/${id}`,{},{headers,responseType:'text',observe:'response'});
  }

  cancelRes(id:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/cancel/${id}`,{},{headers,responseType:'text',observe:'response'});
  }
  getAllRes() : Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
  }

  getResByUserId(id:number) : Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${id}`);
  }
}
