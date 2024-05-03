import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UserRole } from '../../../enums/user-role';

export const attendantGuard: CanActivateFn = (route, state) => {
  
  let role = inject(UserService).getRoleFromToken();
  const router = inject(Router);

  if (role == UserRole.Attendant || role == UserRole.Admin)
    return true;

  router.navigate(['booking']);

  return false;
};