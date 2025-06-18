import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from '../../Models/Destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private apiUrl='http://localhost:8080/api/destinations'

  constructor(private http:HttpClient) { }




  getAllDestinations():Observable<Destination[]>{
    return this.http.get<Destination[]>(`${this.apiUrl}`);
  }

  // addDestination(Destination : Destination):Observable<HttpResponse<string>>{
  //   const headers = new HttpHeaders({'Content-Type':'mulitipart/form-data'});
  //   return this.http.post(`${this.apiUrl}/add-Destination`,Destination,{headers,responseType:'text',observe:'response'});
  // }


  addDestination(Destination: Destination, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nom', Destination.nom);
    formData.append('lieu', Destination.lieu);
    formData.append('typeVoyage', Destination.typeVoyage);
    formData.append('prix', Destination.prix.toString());
    formData.append('dateDebut',Destination.dateDebut.toISOString().substring(0,10));
    formData.append('dateFin',Destination.dateFin.toISOString().substring(0,10));
    formData.append('nombrePlace',Destination.nombrePlace.toString())
    formData.append('description', Destination.description);
    formData.append('image', img, img.name);




    // Debugging line to log the FormData object
    formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    });

    return this.http.post<any>(`${this.apiUrl}/add`, formData);
  }


  updateDestination(id: number, Destination: Destination, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nom', Destination.nom);
    formData.append('lieu', Destination.lieu);
    formData.append('typeVoyage', Destination.typeVoyage);
    formData.append('prix', Destination.prix.toString());
    formData.append('dateDebut',Destination.dateDebut.toISOString().substring(0,10));
    formData.append('dateFin',Destination.dateFin.toISOString().substring(0,10));
    formData.append('nombrePlace',Destination.nombrePlace.toString())
    formData.append('description', Destination.description);
    formData.append('image', img, img.name);

    if(img){
      formData.append('img', img, img.name);
    }


    // Debugging line to log the FormData object
    formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    });

    return this.http.put<any>(`${this.apiUrl}/update/${id}`, formData);
  }

  updateDestinationNoImg(id: number, Destination: Destination): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nom', Destination.nom);
    formData.append('lieu', Destination.lieu);
    formData.append('typeVoyage', Destination.typeVoyage);
    formData.append('prix', Destination.prix.toString());
    formData.append('dateDebut',Destination.dateDebut.toISOString().substring(0,10));
    formData.append('dateFin',Destination.dateFin.toISOString().substring(0,10));
    formData.append('nombrePlace',Destination.nombrePlace.toString())
    formData.append('description', Destination.description);


    // Debugging line to log the FormData object
    formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    });

    return this.http.put<any>(`${this.apiUrl}/update/${id}`, formData);
  }





  getDestinationById(id:number):Observable<Destination>{
    return this.http.get<Destination>(`${this.apiUrl}/${id}`);
  }

  deleteDestination(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
