import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();
  if (isAuthenticated) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
