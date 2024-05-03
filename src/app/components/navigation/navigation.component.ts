import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../services/user/user.service';
import { UserStoreService } from '../../services/token/user-store.service';
import { UserRole } from '../../enums/user-role';
import { RolePipe } from "../../pipes/role/role.pipe";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,
            NgOptimizedImage,
            MatToolbarModule,
            MatMenuModule,
            MatSidenavModule,
            MatListModule,
            MatButtonModule,
            MatIconModule,
            MatDividerModule,
            RolePipe,
            RouterOutlet],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})

export class NavigationComponent implements OnInit {

  sidenavOpened = true;
  userName: string = "";
  userEmail: string = "";
  userRole: UserRole = 0;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _router: Router, 
              private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer){}

  ngOnInit(): void {
    this._userStoreService.getNameFromStore().subscribe(val => {
      let nameFromToken = this._userService.getNameFromToken();
      this.userName = val || nameFromToken
    });

    this._userStoreService.getEmailFromStore().subscribe(val => {
      let emailFromToken = this._userService.getEmailFromToken();
      this.userEmail = val || emailFromToken
    });

    this._userStoreService.getRoleFromStore().subscribe(val => {
      let roleFromToken = this._userService.getRoleFromToken();
      this.userRole = val || roleFromToken;
    });

    this._matIconRegistry.addSvgIcon(
      'users-icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/users.svg')
    );

    this._matIconRegistry.addSvgIcon(
      'badge-icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/badge.svg')
    );

    this._matIconRegistry.addSvgIcon(
      'home-icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/home.svg')
    );

    this._matIconRegistry.addSvgIcon(
      'price-icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/percentage.svg')
    );
  }

  isAdmin(): boolean {
    return this.userRole == UserRole.Admin;
  }

  showRole(): boolean {
    if (this.userRole == UserRole.Admin || this.userRole == UserRole.Attendant)
      return true;

    return false;
  }

  showLogo(): boolean {
    if (this.userRole == UserRole.Admin)
      return false;

    return true;
  }

  showSidenav(): boolean {
    return this._userService.getRoleFromToken() == UserRole.Admin
  }

  onAccount() {
    this._router.navigate(['account']);
  }

  onAccountPassword(){
    this._router.navigate(['account/password']);
  }

  onSignOut(){
    this._userService.signOut();
  }

  onCustomers() {
    this._router.navigate(['customers']);
    
  }

  activeCustomers(): boolean {
    return this._router.url.includes('customers');
  }

  onEmployees(){
    this._router.navigate(['employees']);
  }

  activeEmployees(): boolean {
    return this._router.url.includes('employees');
  }

  onRooms(){
    this._router.navigate(['rooms']);
  }

  activeRooms(): boolean {
    return this._router.url.includes('rooms');
  }

  onValues(){
    this._router.navigate(['values']);
  }

  activeValues(): boolean {
    return this._router.url.includes('values');
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 1600){
      this.sidenavOpened = false;
      return;
    }
    this.sidenavOpened = true;
  }
  
}