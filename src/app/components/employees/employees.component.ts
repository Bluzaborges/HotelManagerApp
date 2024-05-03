import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../dialogs/messages/confirm-dialog/confirm-dialog.component';
import { WarnDialogComponent } from '../dialogs/messages/warn-dialog/warn-dialog.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { UserRole } from '../../enums/user-role';
import { CpfPipe } from '../../pipes/cpf/cpf.pipe';
import { PhonePipe } from '../../pipes/phone/phone.pipe';
import { RolePipe } from '../../pipes/role/role.pipe';

@Component({
    selector: 'app-employees',
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
              BreadcrumbComponent,
              CpfPipe,
              PhonePipe,
              RolePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})

export class EmployeesComponent implements OnInit {

  columns: string[] = ['name', 'cpf', 'email', 'phone', 'role', 'actions'];
  dataSource:any;
  admin = UserRole.Admin;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private _userService: UserService,
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
    this._userService.getAllEmployees().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDeleteUser(id: string){
    this._confirmDialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: 'Você deseja excluir o colaborador?'
    }).afterClosed().subscribe(userResponse => {
      if (userResponse){
        this._userService.delete(id).subscribe({
          next:(res =>{
            this._toast.success(res?.message, 'Sucesso');
            this.loadDataSource();
          }),
          error:(err =>{
            this._warnDialog.open(WarnDialogComponent, {
              width: '500px',
              data: err
            });
          })
        })
      }
    });
  }

  onAddEmployee(){
    this._router.navigate(['employees/add'])
  }

  isAdmin(element: any): boolean {
    return element.role == UserRole.Admin;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}