import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warn-dialog',
  standalone: true,
  imports: [MatDialogContent, 
            MatDialogActions,
            MatDialogClose,
            MatDialogTitle,
            MatButtonModule],
  templateUrl: './warn-dialog.component.html',
  styleUrl: './warn-dialog.component.scss'
})

export class WarnDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public message: string){}
  
}