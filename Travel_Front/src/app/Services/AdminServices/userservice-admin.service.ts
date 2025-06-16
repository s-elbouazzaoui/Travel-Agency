import { Injectable } from '@angular/core';

import { HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/User.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceAdminService {

  private apiUrl = 'http://localhost:8080/api/users';




  constructor(private http:HttpClient) { }

  addUser(user:User):Observable<HttpResponse<string>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`,user,{headers,responseType:'text',observe:'response'})
  }

  updateUser(user:User , userId:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update/${userId}`,user,{headers,responseType:'text',observe:'response'});
  }

  deleteUser(userId:number) : Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`);
  }

  getSingleUser(userId : number) : Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}
