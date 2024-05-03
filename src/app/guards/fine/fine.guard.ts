import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';

export const fineGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const toast = inject(ToastrService);
  const userService = inject(UserService);

  return userService.getFine().pipe(
    take(1),
    map(res => {
      if (res === 0)
        return true;
      router.navigate(['booking']);
      toast.warning('Você tem uma multa pendente.', 'Atenção');
      return false;
    })
  );
};