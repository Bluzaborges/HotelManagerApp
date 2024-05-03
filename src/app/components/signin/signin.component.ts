import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { UserService } from '../../services/user/user.service';
import { UserRole } from '../../enums/user-role';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule,
            RouterModule,
            MatFormFieldModule,
            MatInputModule,
            MatGridListModule,
            MatButtonModule,
            MatIconModule,
            MatDividerModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent implements OnInit {

  form!: FormGroup;
  breakpoint!: number;
  hidePassword = true;

  constructor(private _fb: FormBuilder,
              private _userService: UserService,
              private _warnDialog: MatDialog,
              private _router: Router){}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.breakpoint = (window.innerWidth < 1920) ? 1 : 2;
  }

  onSubmit(){
    if (this.form.valid){
      this._userService.signIn(this.form.value).subscribe({
        next:(res => {
          this._userService.storeToken(res.token);
          
          if (this._userService.getRoleFromToken() == UserRole.Customer){
            this._router.navigate(['booking']);
            return;
          }

          this._router.navigate(['customers']);
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

  onResize(event: any){
    this.breakpoint = (event.target.innerWidth < 1920) ? 1 : 2;
  }

}