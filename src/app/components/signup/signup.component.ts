import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SuccessDialogComponent } from '../dialogs/messages/success-dialog/success-dialog.component';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { UserService } from '../../services/user/user.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
            NgOptimizedImage,
            NgxMaskDirective,
            MatGridListModule,
            MatStepperModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {

  form!: FormGroup;
  breakpoint!: number;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private _fb: FormBuilder,
              private _userService: UserService,
              private _successDialog: MatDialog,
              private _warnDialog: MatDialog,
              private _router: Router){}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    }, { validators: confirmPasswordValidator});

    this.breakpoint = (window.innerWidth < 1920) ? 1 : 2;
  }

  onSubmit(){
    if (this.form.valid){
      this._userService.signUp(this.form.value).subscribe({
        next:(res => {
          this._successDialog.open(SuccessDialogComponent, {
            width: '500px',
            data: res?.message
          });
          this._router.navigate(['']);
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

  onSignIn(){
    this._router.navigate(['']);
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth < 1920) ? 1 : 2;
  }

}