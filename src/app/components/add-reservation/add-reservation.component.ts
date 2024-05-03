import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { SuccessDialogComponent } from '../dialogs/messages/success-dialog/success-dialog.component';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { RoomValueService } from '../../services/room-value/room-value-service';
import { RoomType } from '../../enums/room-type';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [CommonModule,
            MatGridListModule,
            MatCardModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatDatepickerModule,
            MatInputModule,
            MatRadioModule,
            MatButtonModule,
            BreadcrumbComponent],
            providers: [provideNativeDateAdapter()],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.scss'
})

export class AddReservationComponent implements OnInit {
  
  form!: FormGroup
  breakpoint!: number;
  roomValues: any = [];
  currentPathSubtitle: string = "";

  constructor(private _fb: FormBuilder,
              private _reservationService: ReservationService,
              private _roomValueService: RoomValueService,
              private _successDialog: MatDialog,
              private _warnDialog: MatDialog,
              private _activatedRoute: ActivatedRoute,
              private _router: Router){}

  ngOnInit(): void {
    const idReservation = this._activatedRoute.snapshot.paramMap.get('id');

    this.form = this._fb.group({
      idReservation: new FormControl(''),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      type: new FormControl(RoomType.Deluxe, [Validators.required])
    });

    if (idReservation != null) {
      this._reservationService.get(idReservation).subscribe(res => {
        this.form.patchValue({
          idReservation: res.id,
          startDate: res.startDate,
          endDate: res.endDate,
          type: res.room.roomValue.type,
        });
      });
    }

    this._roomValueService.getAll().subscribe(res => {
      this.roomValues = res;
    });

    this.breakpoint = (window.innerWidth < 1400) ? 1 : 2;
    this.currentPathSubtitle = this._activatedRoute.snapshot.data['subtitle'];
  }

  getMinimumStartDate(): Date{
    return new Date();
  }

  getMinimumEndDate(): Date{
    let data = new Date();

    if (this.form.value.startDate)
      data = new Date(this.form.value.startDate);

    data.setDate(data.getDate() + 1);

    console.log(data);

    return data;
  }

  getMaximumStartDate(): Date{
    let data = new Date();
    data.setFullYear(data.getFullYear() + 1);
    return data;
  }

  getMaximumEndDate(): Date{
    let data = new Date();

    if (this.form.value.startDate){
      data = new Date(this.form.value.startDate);
      data.setMonth(data.getMonth() + 1);
      return data;
    }

    data.setFullYear(data.getFullYear() + 1);

    return data;
  }

  isCardSelected(roomType: RoomType): boolean {
      return this.form.get('type')?.value === roomType;
  }

  selectRadio(roomType: RoomType) {
    const typeControl = this.form.get('type');
    if (typeControl)
      typeControl.setValue(roomType);
  }

  onSubmit(){
    if (this.form.valid){
      const action = this._activatedRoute.snapshot.paramMap.get('id')
                     ? this._reservationService.update(this.form.value)
                     : this._reservationService.add(this.form.value);

      action.subscribe({
        next:(res => {
          this._successDialog.open(SuccessDialogComponent, {
            width: '500px',
            data: res?.message
          });
          this._router.navigate(['booking']);
        }),
        error:(err => {
          this._warnDialog.open(WarnDialogComponent, {
            width: '500px',
            data: err
          });
        })
      });
    }
  }

  onPreviousPage(){
    this._router.navigate(['booking']);
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1400) ? 1 : 2;
  }

}