import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ToastrService } from 'ngx-toastr';
import { RoomValueService } from '../../services/room-value/room-value-service';

@Component({
  selector: 'app-values',
  standalone: true,
  imports: [CommonModule, 
            MatGridListModule, 
            MatCardModule, 
            MatButtonModule, 
            BreadcrumbComponent],
  templateUrl: './values.component.html',
  styleUrl: './values.component.scss'
})

export class ValuesComponent implements OnInit {

  breakpoint!: number;
  roomValues: any = [];

  constructor(private _roomValueService: RoomValueService,
              private _toast: ToastrService,
              private _router: Router){}

  ngOnInit(): void {
    this._roomValueService.getAll().subscribe({
      next:(res => {
        this.roomValues = res;
      }),
      error:(err => {
        this._toast.error(err, 'Algo deu errado');
        this._router.navigate(['customers']);
      })
    });

    this.breakpoint = (window.innerWidth < 1920) ? 1 : 2;
  }

  onEditRoomValue(id: string){
    this._router.navigate(['values/edit', id]);
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1600) ? 1 : 2;
  }

}