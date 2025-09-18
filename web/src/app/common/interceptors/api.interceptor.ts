import { AuthService } from '@/app/auth/auth.service';
import { environment } from '@/environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/assets/svgs/')) {
    return next(req);
  }
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();
  const reqClone = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    setHeaders: isAuthenticated
      ? { Authorization: `Bearer ${authService.getToken()}` }
      : {},
  });

  return next(reqClone);
};
