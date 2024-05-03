import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ToastrService } from 'ngx-toastr';
import { RoomValueService } from '../../services/room-value/room-value-service';

@Component({
  selector: 'app-edit-value',
  standalone: true,
  imports: [CommonModule, 
            NgxMaskDirective, 
            MatCardModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatButtonModule, 
            BreadcrumbComponent],
  templateUrl: './edit-value.component.html',
  styleUrl: './edit-value.component.scss'
})

export class EditValueComponent implements OnInit {

  form!: FormGroup;

  constructor(private _fb: FormBuilder,
              private _roomValueService: RoomValueService,
              private _warnDialog: MatDialog,
              private _toast: ToastrService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router){}

  ngOnInit(): void {
    const idRoomValue = this._activatedRoute.snapshot.paramMap.get('id');

    if (idRoomValue != null) {
      this._roomValueService.get(idRoomValue).subscribe(res => {
        this.form = this._fb.group({
          idRoomValue: new FormControl(`${res.id}`, [Validators.required]),
          name: new FormControl(`${res.name}`, [Validators.required]),
          value: new FormControl(`${res.value.toFixed(2)}`, [Validators.required])
        });
      });
    }
  }

  onSubmit(){
    if (this.form.valid){
      this.form.value.value = this.formatValue(this.form.value.value);
      this._roomValueService.update(this.form.value).subscribe({
        next:(res => {
          this._toast.success(res?.message, 'Sucesso');
          this.onPreviousPage();
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

  formatValue(value: string): number {
    const cleanedValue = value.replace('R$ ', '').replace(/\./g, '');
    const formattedValue = cleanedValue.replace(',', '.');
    return parseFloat(formattedValue);
  }

  onPreviousPage(){
    this._router.navigate(['values']);
  }
  
}