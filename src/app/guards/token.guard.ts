import { CanActivateFn } from '@angular/router';
import { environment } from 'env';

export const tokenGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  if (token !== null) {
    return true;
  } else {
    window.location.href = environment.webUrl;
    return false;
  }
};
