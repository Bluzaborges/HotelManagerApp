import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogContent,
            MatDialogActions,
            MatDialogClose,
            MatDialogTitle,
            MatButtonModule],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})

export class SuccessDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public message: string){}

}