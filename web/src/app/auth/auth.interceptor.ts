import { HttpInterceptorFn } from '@angular/common/http';
import { AUTHENTICATION_TOKEN } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isLocalStorageAvailable =
    typeof window !== 'undefined' && window.localStorage;

  if (isLocalStorageAvailable) {
    const token = localStorage.getItem(AUTHENTICATION_TOKEN);
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloned);
    }
  }
  return next(req);
};
