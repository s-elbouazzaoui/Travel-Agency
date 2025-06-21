import { Injectable } from '@angular/core';

import {HttpClient, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../Models/User.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserserviceAdminService {

  private apiUrl = 'http://localhost:8080/api/users';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();


  constructor(private router:Router,private http: HttpClient,private toast:ToastrService) {
    const savedUserId = sessionStorage.getItem('userId');
    const savedRole = sessionStorage.getItem('userRole');

    if (savedUserId && savedRole) {
      this.userIdSubject.next(+savedUserId); // convert to number
      this.userRoleSubject.next(savedRole);
    }
  }

  addUser(user: User): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/add`, user, {headers, responseType: 'text', observe: 'response'})
  }

  updateUser(user: User, userId: number): Observable<HttpResponse<String>> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`${this.apiUrl}/update/${userId}`, user, {headers, responseType: 'text', observe: 'response'});
  }

  deleteUser(userId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`);
  }

  getSingleUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }


  register(user:User):Observable<HttpResponse<string>> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/register`, user, {headers, responseType: 'text', observe: 'response'})
  }



  login(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User>(`${this.apiUrl}/logs`, {params}).pipe(
      tap(res => {
        // save to session and in-memory
        sessionStorage.setItem('userId', res.id.toString());
        sessionStorage.setItem('userRole', res.role.id.toString());
        console.log("id : "+sessionStorage.getItem('userId'))
        console.log("Role id : "+sessionStorage.getItem('userRole'))

        // Update the BehaviorSubjects
        this.userIdSubject.next(res.id);
        this.userRoleSubject.next(res.role.id.toString());
      })
    );
  }

  logout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    window.close();
    this.router.navigate([''])
    this.toast.success("Logged out")
    this.userIdSubject.next(null);
    this.userRoleSubject.next(null);
  }

  // Getters for user ID and role
  get userId(): number | null {
    return this.userIdSubject.value;
  }

  get userRole(): string | null {
    return this.userRoleSubject.value;
  }
}

