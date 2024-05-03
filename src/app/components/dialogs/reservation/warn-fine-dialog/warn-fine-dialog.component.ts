import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warn-fine-dialog',
  standalone: true,
  imports: [MatDialogContent,
            MatDialogActions,
            MatDialogClose,
            MatDialogTitle,
            MatButtonModule],
  templateUrl: './warn-fine-dialog.component.html',
  styleUrl: './warn-fine-dialog.component.scss'
})

export class WarnFineDialogComponent {

  constructor(private _dialogRef: MatDialogRef<WarnFineDialogComponent>){}

  onNoClick(): void {
    this._dialogRef.close(false);
  }

  onYesClick(): void {
    this._dialogRef.close(true);
  }

}