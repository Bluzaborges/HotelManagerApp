import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from '../token/user-store.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private _userPayload: any;

  constructor(private _httpClient: HttpClient, 
              private _router: Router,
              private _userStoreService: UserStoreService){
    this._userPayload = this.decodeToken();
  }

  public get(){
    return this._httpClient.get<any>(`${environment.apiUrl}/User`);
  }

  public getAllCustomers(){
    return this._httpClient.get<any>(`${environment.apiUrl}/User/Customers`);
  }

  public getAllEmployees(){
    return this._httpClient.get<any>(`${environment.apiUrl}/User/Employees`);
  }

  public getFine(){
    return this._httpClient.get<any>(`${environment.apiUrl}/User/Fine`);
  }

  public getNameFromToken(){
    if (this._userPayload)
      return this._userPayload.unique_name;
  }

  public getEmailFromToken(){
    if (this._userPayload)
      return this._userPayload.email;
  }

  public getRoleFromToken(){
    if (this._userPayload)
      return this._userPayload.role;
  }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public update(user: any){
    return this._httpClient.put<any>(`${environment.apiUrl}/User/Update`, user);
  }

  public updatePassword(password: any){
    return this._httpClient.patch<any>(`${environment.apiUrl}/User/Password`, { password: password });
  }

  public block(id: string){
    return this._httpClient.patch<any>(`${environment.apiUrl}/User/Block/${id}`, id);
  }

  public unblock(id: string){
    return this._httpClient.patch<any>(`${environment.apiUrl}/User/Unblock/${id}`, id);
  }

  public removeFine(id: string){
    return this._httpClient.patch<any>(`${environment.apiUrl}/User/Fine/${id}`, id);
  }

  public signUp(user: any){
    return this._httpClient.put<any>(`${environment.apiUrl}/User/Add`, user);
  }

  public signIn(user: any){
    return this._httpClient.post<any>(`${environment.apiUrl}/User/Signin`, user);
  }

  public signOut(){
    localStorage.clear();
    this._router.navigate(['']);
  }

  public delete(id: string){
    return this._httpClient.delete<any>(`${environment.apiUrl}/User/${id}`);
  }
  
  public storeToken(token: string){
    localStorage.setItem('token', token);
    this.storePayload();
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private decodeToken(){
    return new JwtHelperService().decodeToken(this.getToken());
  }

  private storePayload(){
    this._userPayload = this.decodeToken();
    this._userStoreService.setNameForStore(this._userPayload.unique_name);
    this._userStoreService.setEmailForStore(this._userPayload.email);
    this._userStoreService.setRoleForStore(this._userPayload.role);
  }

}