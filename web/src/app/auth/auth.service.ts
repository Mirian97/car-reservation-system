import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { errorMessages } from '../constants/errorMessages';
import { LoginForm, SignUpForm, Token } from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = `${environment.apiUrl}auth`;
  readonly AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.AUTHENTICATION_TOKEN);
  }

  setToken(token: string): void {
    if (!this.isBrowser) return;
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
        throwError(() => error.error.message || errorMessages.unexpected),
      ),
    );
  }

  signUp(form: SignUpForm): Observable<any> {
    return this.http.post<Token>(`${this.API_URL}/sign-up`, form).pipe(
      tap((response: Token) => {
        if (response.token) {
          this.setToken(response.token);
        }
      }),
      catchError((error) =>
        throwError(() => error.error.message || errorMessages.unexpected),
      ),
    );
  }
}
