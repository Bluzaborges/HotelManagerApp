import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../../enums/user-role';

@Injectable({
  providedIn: 'root'
})

export class UserStoreService {

  private _name$ = new BehaviorSubject<string>("");
  private _email$ = new BehaviorSubject<string>("");
  private _role$ = new BehaviorSubject<UserRole>(0);

  constructor(){}

  public getNameFromStore(){
    return this._name$.asObservable();
  }

  public getEmailFromStore(){
    return this._email$.asObservable();
  }

  public getRoleFromStore(){
    return this._role$.asObservable();
  }

  public setNameForStore(name:string){
    this._name$.next(name);
  }

  public setEmailForStore(email:string){
    this._email$.next(email);
  }

  public setRoleForStore(role:UserRole){
    this._role$.next(role);
  }
  
}