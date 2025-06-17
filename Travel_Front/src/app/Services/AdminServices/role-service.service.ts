import { Injectable } from '@angular/core';
import {Roles} from '../../Models/Roles.model';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/User.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  private apiUrl='http://localhost:8080/api/roles';

  constructor(private http :HttpClient) { }

  addRole(role:Roles):Observable<HttpResponse<string>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`,role,{headers,responseType:'text',observe:'response'})
  }

  updateRole(role:Roles , roleId:number) : Observable<HttpResponse<String>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update/${roleId}`,role,{headers,responseType:'text',observe:'response'});
  }

  deleteRole(roleId:number) : Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiUrl}/delete/${roleId}`);
  }

  getRoleById(roleId : number) : Observable<Roles>{
    return this.http.get<Roles>(`${this.apiUrl}/${roleId}`);
  }

  getAllRole() : Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.apiUrl}`);
  }
}
