import { Routes } from '@angular/router';
import { authenticationGuard } from './guards/authentication/authentication.guard';
import { adminGuard } from './guards/authorization/admin/admin.guard';
import { attendantGuard } from './guards/authorization/attendant/attendant.guard';
import { customerGuard } from './guards/authorization/customer/customer.guard';
import { fineGuard } from './guards/fine/fine.guard';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { ValuesComponent } from './components/values/values.component';
import { EditValueComponent } from './components/edit-value/edit-value.component';
import { AccountComponent } from './components/account/account.component';
import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [

    { 
        path: '', 
        component: SigninComponent 
    },
    { 
        path: 'signup', 
        component: SignupComponent 
    },
    {
        path: '',
        component: NavigationComponent,
        children: [
            { 
                path: 'booking', 
                component: ReservationsComponent, 
                canActivate:[authenticationGuard, customerGuard], 
                data: {title: 'Reservas', subtitle: 'Minhas reservas'}
            },
            { 
                path: 'booking/reserve', 
                component: AddReservationComponent, 
                canActivate:[authenticationGuard, fineGuard, customerGuard], 
                data: {title: 'Reservas', subtitle: 'Reservar quarto'}
            },
            { 
                path: 'booking/edit/:id', 
                component: AddReservationComponent, 
                canActivate:[authenticationGuard, fineGuard, customerGuard], 
                data: {title: 'Reservas', subtitle: 'Alterar reserva'}
            },
            { 
                path: 'customers', 
                component: CustomersComponent, 
                canActivate:[authenticationGuard, attendantGuard], 
                data: {title: 'Clientes', subtitle: 'Lista de clientes'}
            },
            { 
                path: 'employees', 
                component: EmployeesComponent, 
                canActivate: [authenticationGuard, adminGuard], 
                data: {title: 'Colaboradores', subtitle: 'Lista de colaboradores'}
            },
            { 
                path: 'employees/add', 
                component: AddEmployeeComponent, 
                canActivate:[authenticationGuard, adminGuard], 
                data: {title: 'Colaboradores', subtitle: 'Adicionar colaborador'}
            },
            {
                path: 'rooms',
                component: RoomsComponent,
                canActivate:[authenticationGuard, adminGuard],
                data: {title: 'Quartos', subtitle: 'Lista de quartos'}
            },
            {
                path: 'rooms/add',
                component: AddRoomComponent,
                canActivate:[authenticationGuard, adminGuard],
                data: {title: 'Quartos', subtitle: 'Adicionar quarto'}
            },
            {
                path: 'values',
                component: ValuesComponent,
                canActivate:[authenticationGuard, adminGuard],
                data: {title: 'Valores', subtitle: 'Relação de valores'}
            },
            {
                path: 'values/edit/:id',
                component: EditValueComponent,
                canActivate:[authenticationGuard, adminGuard],
                data: {title: 'Valores', subtitle: 'Editar valor'}
            },
            { 
                path: 'account', 
                component: AccountComponent, 
                canActivate:[authenticationGuard], 
                data: {title: "Conta", subtitle: "Minha conta"}
            },
            { 
                path: 'account/password', 
                component: AccountPasswordComponent, 
                canActivate:[authenticationGuard], 
                data: {title: "Conta", subtitle: "Alterar senha"}
            },
        ]
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }
];