import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../../enums/user-role';

@Pipe({
  name: 'role',
  standalone: true
})

export class RolePipe implements PipeTransform {

  transform(value: UserRole | string): string {
  
    if (value == UserRole.Admin)
      return 'Administrador'

    if (value == UserRole.Attendant)
      return 'Atendente'

    return 'Cliente'
  }
}