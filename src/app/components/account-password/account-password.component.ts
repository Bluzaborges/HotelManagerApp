import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-account-password',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatButtonModule,
            MatIconModule,
            BreadcrumbComponent],
  templateUrl: './account-password.component.html',
  styleUrl: './account-password.component.scss'
})

export class AccountPasswordComponent implements OnInit {

  form!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private _fb: FormBuilder,
              private _userService: UserService,
              private _warnDialog: MatDialog,
              private _toast: ToastrService){}

  ngOnInit(): void {
    this.form = this._fb.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: confirmPasswordValidator});
  }

  onSubmit(){
    if (this.form.valid){
      this._userService.updatePassword(this.form.value.password).subscribe({
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

  onPreviousPage(){
    history.back();
  }

}