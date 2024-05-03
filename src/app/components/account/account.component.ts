import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule,
            NgxMaskDirective,
            MatCardModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            BreadcrumbComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent implements OnInit {

  form!: FormGroup;

  constructor(private _fb: FormBuilder, 
              private _userService: UserService,
              private _warnDialog: MatDialog,
              private _toast: ToastrService){}

  ngOnInit(): void {
    this._userService.get().subscribe({
      next:(res => {
        this.form = this._fb.group({
          name: new FormControl(`${res.name}`, [Validators.required]),
          cpf: new FormControl(`${res.cpf}`, [Validators.required]),
          email: new FormControl(`${res.email}`, [Validators.required, Validators.email]),
          phone: new FormControl(`${res.phone}`, [Validators.required])
        });
      }),
      error:(err =>{
        this._toast.error(err, 'Algo deu errado');
        this.onPreviousPage();
      })
    });
  }

  onSubmit(){
    if (this.form.valid){
      this._userService.update(this.form.value).subscribe({
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
      })
    } else {
      this._toast.error('Todos os campos devem estar válidos', 'Algo deu errado');
    }
  }

  onPreviousPage(){
    history.back();
  }
}