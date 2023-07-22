import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class validateGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const isTokenValid = await this.apiService.validacion(token);
        if (isTokenValid) {
          return true; // Usuario autenticado, se permite el acceso al dashboard
        } else {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return false; // Usuario no autenticado, se redirige al login
        }
      } catch (error) {
        localStorage.removeItem('token');
        // console.error('Error al verificar el token:', error);
        this.router.navigate(['/login']);
        return false; // Error al verificar el token, se redirige al login por precaución
      }
    } else {
      this.router.navigate(['/login']);
      return false; // Usuario no autenticado, se redirige al login
    }
  }
}
