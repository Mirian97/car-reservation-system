import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginForm, Token } from '../types/auth.type';

export const AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) {}

  login(form: LoginForm): Observable<any> {
    return this.http.post<Token>(`${this.API_URL}/login`, form).pipe(
      tap((response: Token) => {
        if (response.token) {
          localStorage.setItem(AUTHENTICATION_TOKEN, response.token);
        }
      }),
      catchError((error) =>
        throwError(
          () => error.error.message || 'Falha inesperada, tente novamente',
        ),
      ),
    );
  }
}
