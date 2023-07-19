import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/login/login.service';
import { Logout } from '../interface/login';
import { ResourceLoader } from '@angular/compiler';

export const validateGuard: CanActivateFn = () => {
  const loginService = inject(ApiService);
  const router = inject(Router);
  const token: string | null = localStorage.getItem('token');

  if (token !== null) {
    const rep = loginService.validacion(token);
    rep.subscribe((result:any) => {
      if(result === 1){
        console.log(result);
        console.log(1);
        return true;
      } else {
        console.log(result);
        console.log(0);
        return false;
      }
    });
    return false;
  } else {
    // Aquí puedes manejar el caso en el que el token sea nulo, por ejemplo, redirigir al usuario al inicio de sesión.
    router.navigate(['/login']);
    console.log('token vacio')
    return false;
  }
};
