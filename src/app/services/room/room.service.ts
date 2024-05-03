import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  constructor(private _httpClient: HttpClient) { }

  public getAll(){
    return this._httpClient.get<any>(`${environment.apiUrl}/Room`);
  }

  public add(room: any){
    return this._httpClient.post<any>(`${environment.apiUrl}/Room/Add`, room);
  }

  public delete(id: string){
    return this._httpClient.delete<any>(`${environment.apiUrl}/Room/${id}`);
  }
  
}