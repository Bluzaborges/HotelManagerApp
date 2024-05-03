import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (inject(UserService).isLoggedIn())
    return true;
  
  toast.error('Faça seu login primeiro', 'Algo deu errado');
  router.navigate([''])

  return false;
};