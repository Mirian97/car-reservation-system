import { AuthService } from '@/app/auth/auth.service';
import { mapErrorMessageByStatusCode } from '@/app/helpers/map-error-message-by-status-code.helper';
import { toast } from '@/app/helpers/toast';
import { environment } from '@/environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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

  return next(reqClone).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }
      const formattedError = mapErrorMessageByStatusCode(
        error.status,
        error.error.message,
      );
      toast.error(formattedError);
      return throwError(() => error);
    }),
  );
};
