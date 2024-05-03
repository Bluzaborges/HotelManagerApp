import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SuccessDialogComponent } from '../dialogs/messages/success-dialog/success-dialog.component';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RoomValueService } from '../../services/room-value/room-value-service';
import { RoomService } from '../../services/room/room.service';
import { RoomType } from '../../enums/room-type';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, 
            MatCardModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatSelectModule, 
            MatButtonModule, 
            MatIconModule, 
            BreadcrumbComponent],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})

export class AddRoomComponent implements OnInit {

  form!: FormGroup;
  currentPathSubtitle: string = "";

  roomTypes: any[] = [
    {value: RoomType.Conventional, viewValue: ''},
    {value: RoomType.Deluxe, viewValue: ''}
  ];

  constructor(private _fb: FormBuilder,
              private _roomService: RoomService,
              private _roomValueService: RoomValueService,
              private _successDialog: MatDialog,
              private _warnDialog: MatDialog,
              private _activatedRoute: ActivatedRoute,
              private _router: Router){}

  ngOnInit(): void {
    this._roomValueService.getAll().subscribe(res => {
      res.forEach((item: { type: RoomType; name: string; }) => {
        const index = this.roomTypes.findIndex(roomType => roomType.value === item.type);
        if (index !== -1) {
          this.roomTypes[index].viewValue = item.name;
        }
      });
    });

    this.form = this._fb.group({
      code: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    });

    this.currentPathSubtitle = this._activatedRoute.snapshot.data['subtitle'];
  }

  onSubmit(){
    if (this.form.valid){
      this._roomService.add(this.form.value).subscribe({
        next:(res => {
          this._successDialog.open(SuccessDialogComponent, {
            width: '500px',
            data: res?.message
          });
          this._router.navigate(['rooms']);
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
    this._router.navigate(['rooms']);
  }

}