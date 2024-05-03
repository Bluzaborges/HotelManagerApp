import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SuccessDialogComponent } from '../dialogs/messages/success-dialog/success-dialog.component';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { UserService } from '../../services/user/user.service';
import { UserRole } from '../../enums/user-role';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,
            NgxMaskDirective,
            MatCardModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatButtonModule,
            MatIconModule,
            BreadcrumbComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})

export class AddEmployeeComponent implements OnInit {

  form!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  currentPathSubtitle: string = "";

  userRoles: any[] = [
    {value: UserRole.Attendant, viewValue: 'Atendente'},
    {value: UserRole.Admin, viewValue: 'Administrador'}
  ];

  constructor(private _fb: FormBuilder,
              private _userService: UserService,
              private _successDialog: MatDialog,
              private _warnDialog: MatDialog,
              private _activatedRoute: ActivatedRoute,
              private _router: Router){}

  ngOnInit(): void {
    this.form = this._fb.group({
      role: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    }, { validators: confirmPasswordValidator});

    this.currentPathSubtitle = this._activatedRoute.snapshot.data['subtitle'];
  }

  onSubmit(){
    if (this.form.valid){
      this._userService.signUp(this.form.value).subscribe({
        next:(res => {
          this._successDialog.open(SuccessDialogComponent, {
            width: '500px',
            data: res?.message
          });
          this._router.navigate(['employees']);
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
    this._router.navigate(['employees']);
  }
  
}