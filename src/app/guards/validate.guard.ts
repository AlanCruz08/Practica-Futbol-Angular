import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/login/login.service';
import { Logout } from '../interface/login';
import { ResourceLoader } from '@angular/compiler';

export const validateGuard: CanActivateFn = () => {
  const loginService = inject(ApiService);
  const router = inject(Router);

  async canActivate(): Promise < boolean > {
    const token: string | null = localStorage.getItem('token');

  if (token !== null) {
    try {
      const result: any = await loginService.validacion(token).toPromise();
      rep.subscribe((result: any) => {
        if (result === 1) {
          console.log(token);
          return true;
        } else {
          console.log(result);
          localStorage.removeItem('token');
          return false;
        }
      });
    } catch (error) {
      console.error(error);
      return false;
    }


  } else {
    // Aquí puedes manejar el caso en el que el token sea nulo, por ejemplo, redirigir al usuario al inicio de sesión.
    console.log('token vacio')
    router.navigate(['/login']);
    return false;
  }
}
};
