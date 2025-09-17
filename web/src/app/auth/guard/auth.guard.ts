import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
