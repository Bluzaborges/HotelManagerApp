import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const userService = inject(UserService);
  const token = userService.getToken();
  const toast = inject(ToastrService);
  
  if (token){
    req = req.clone({
      setHeaders: { Authorization:`Bearer ${token}` }
    });
  }

  return next(req).pipe(

    catchError((err: any) => {
      
      if (err instanceof HttpErrorResponse){

        if (err.status === 0){
          toast.error('Alguns erros ocorreram', 'Erro');
          userService.signOut();
          return of();
        }

        if (err.status === 401){
          toast.warning('O acesso expirou, por favor faça login novamente.', 'Atenção');
          userService.signOut();
          return of();
        }

        if (err.status === 403){
          return throwError(() => 'Acesso não autorizado.');
        }

        if (err.status === 500){
          return throwError(() => 'Alguns erros ocorreram.');
        }
      }

      return throwError(() => err?.error);
    })
  );
};