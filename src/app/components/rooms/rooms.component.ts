import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../../services/room/room.service';
import { ConfirmDialogComponent } from '../dialogs/messages/confirm-dialog/confirm-dialog.component';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { RoomType } from '../../enums/room-type';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule,
            MatCardModule, 
            MatTableModule, 
            MatPaginatorModule, 
            MatSortModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatButtonModule, 
            MatTooltipModule,
            MatIconModule, 
            BreadcrumbComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit {

  columns: string[] = ['code', 'type', 'reservationsCount', 'actions'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private _roomService: RoomService,
              private _confirmDialog: MatDialog,
              private _warnDialog: MatDialog,
              private _toast: ToastrService,
              private _router: Router,
              private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.loadDataSource();

    this._matIconRegistry.addSvgIcon(
      'trash-icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/trash.svg')
    );
  }

  loadDataSource(){
    this._roomService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAddRoom(){
    this._router.navigate(['rooms/add']);
  }

  onDeleteRoom(id: string){
    this._confirmDialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: 'Você deseja excluir o quarto?'
    }).afterClosed().subscribe(userResponse => {
      if (userResponse){
        this._roomService.delete(id).subscribe({
          next:(res => {
            this._toast.success(res?.message, 'Sucesso');
            this.loadDataSource();
          }),
          error:(err => {
            this._warnDialog.open(WarnDialogComponent, {
              width: '500px',
              data: err
            });
          })
        });
      }
    });
  }

  isDeluxe(element: any): boolean {
    return element.roomValue.type == RoomType.Deluxe;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}