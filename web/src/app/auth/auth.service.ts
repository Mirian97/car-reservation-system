import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginForm, Token } from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = `${environment.apiUrl}auth`;
  readonly AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.AUTHENTICATION_TOKEN);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTHENTICATION_TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(this.AUTHENTICATION_TOKEN, token);
  }

  login(form: LoginForm): Observable<any> {
    return this.http.post<Token>(`${this.API_URL}/login`, form).pipe(
      tap((response: Token) => {
        if (response.token) {
          this.setToken(response.token);
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
