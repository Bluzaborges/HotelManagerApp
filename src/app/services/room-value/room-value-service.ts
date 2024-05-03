import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class RoomValueService {

  constructor(private _httpClient: HttpClient) { }

  public getAll(){
    return this._httpClient.get<any>(`${environment.apiUrl}/RoomValue`);
  }

  public get(id: string){
    return this._httpClient.get<any>(`${environment.apiUrl}/RoomValue/${id}`);
  }
  
  public update(roomValue: any){
    return this._httpClient.put<any>(`${environment.apiUrl}/RoomValue/Update`, roomValue);
  }
  
}