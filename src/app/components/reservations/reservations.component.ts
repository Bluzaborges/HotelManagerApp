import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { SuccessDialogComponent } from '../dialogs/messages/success-dialog/success-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/messages/confirm-dialog/confirm-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { UserService } from '../../services/user/user.service';
import { WarnFineDialogComponent } from '../dialogs/reservation/warn-fine-dialog/warn-fine-dialog.component';
import { WarnOverdueDialogComponent } from '../dialogs/reservation/warn-overdue-dialog/warn-overdue-dialog.component';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule,
            MatGridListModule,
            MatCardModule,
            MatButtonModule,
            MatIconModule,
            BreadcrumbComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})

export class ReservationsComponent implements OnInit {

  breakpoint!: number;
  reservations: any = [];

  constructor(private _reservationService: ReservationService,
              private _userService: UserService,
              private _successDialog: MatDialog,
              private _confirmDialog: MatDialog,
              private _warnDialog: MatDialog,
              private _cancelationWarnDialog: MatDialog,
              private _fineWarnDialog: MatDialog,
              private _router: Router){}

  ngOnInit(): void {
    this.loadData();
    this.breakpoint = (window.innerWidth < 1600) ? 1 : 4;
  }

  loadData(){
    this._reservationService.getAll().subscribe(res => {
      this.reservations = res;
    });
  }

  onRegisterReservation(){
    this._userService.getFine().subscribe(res => {
      if (res == 0){
        this._router.navigate(['/booking/reserve']);
        return;
      }
        
      this._fineWarnDialog.open(WarnOverdueDialogComponent, {
        width: '500px',
        disableClose: true,
        data: res
      });
    });
  }

  onEditReservation(id: string){
    this._userService.getFine().subscribe(res => {
      if (res == 0){
        this._router.navigate(['/booking/edit', id]);
        return;
      }
        
      this._fineWarnDialog.open(WarnOverdueDialogComponent, {
        width: '500px',
        disableClose: true,
        data: res
      });
    });
  }

  onCancelReservation(startDate: Date, id: string){
    this._reservationService.checkFine(startDate).subscribe(res => {

      let dialog;

      if (!res){
        dialog = this._confirmDialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: 'Você realmente deseja cancelar a reserva?'
        });
      } else {
        dialog = this._cancelationWarnDialog.open(WarnFineDialogComponent, {
          width: '500px'
        });
      }

      dialog.afterClosed().subscribe(userResponse => {
        if (userResponse){
          this._reservationService.cancel(id).subscribe({
            next:(res => {
              this._successDialog.open(SuccessDialogComponent, {
                width: '500px',
                data: res?.message
              });
              this.loadData();
            }),
            error:(err => {
              this._warnDialog.open(WarnDialogComponent, {
                width: '500px',
                data: err
              })
            })
          });
        }
      })
    });
  }

  inProgress(startDate: Date): boolean {
    if (new Date(startDate) <= new Date())
      return true;

    return false;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1600) ? 1 : 4;
  }

}