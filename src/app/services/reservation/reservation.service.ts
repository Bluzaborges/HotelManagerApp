import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  constructor(private _httpClient: HttpClient) { }

  public getAll(){
    return this._httpClient.get<any>(`${environment.apiUrl}/Reservation`);
  }

  public get(id: string){
    return this._httpClient.get<any>(`${environment.apiUrl}/Reservation/${id}`);
  }

  public checkFine(startDate: Date){
    return this._httpClient.get<any>(`${environment.apiUrl}/Reservation/Fine/${startDate}`);
  }

  public add(reservation: any){
    return this._httpClient.post<any>(`${environment.apiUrl}/Reservation/Add`, reservation);
  }

  public update(reservation: any){
    return this._httpClient.post<any>(`${environment.apiUrl}/Reservation/Update`, reservation);
  }

  public cancel(id: string){
    return this._httpClient.post<any>(`${environment.apiUrl}/Reservation/Cancel/${id}`, id);
  }
  
}