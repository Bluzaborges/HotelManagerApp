import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warn-overdue-dialog',
  standalone: true,
  imports: [CommonModule,
            MatDialogContent,
            MatDialogActions,
            MatDialogClose,
            MatDialogTitle,
            MatButtonModule],
  templateUrl: './warn-overdue-dialog.component.html',
  styleUrl: './warn-overdue-dialog.component.scss'
})

export class WarnOverdueDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public fine: number){}

}