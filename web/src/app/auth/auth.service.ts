import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { errorMessages } from '../constants/error-messages.constant';
import { AuthResponse, LoginForm, SignUpForm, User } from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_PATH = 'auth/';
  readonly AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';
  readonly AUTHENTICATED_USER = 'AUTHENTICATED_USER';
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

  getUser(): User | null {
    if (!this.isBrowser) return null;
    const user = localStorage.getItem(this.AUTHENTICATED_USER);
    return user ? JSON.parse(user) : null;
  }

  setUser(user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.AUTHENTICATED_USER, JSON.stringify(user));
  }

  login(form: LoginForm): Observable<any> {
    return this.http.post<AuthResponse>(`${this.BASE_PATH}login`, form).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(response.user);
        }
      }),
      catchError((error) =>
        throwError(() => error.error.message || errorMessages.unexpected),
      ),
    );
  }

  signUp(form: SignUpForm): Observable<any> {
    return this.http.post<AuthResponse>(`${this.BASE_PATH}sign-up`, form).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(response.user);
        }
      }),
      catchError((error) =>
        throwError(() => error.error.message || errorMessages.unexpected),
      ),
    );
  }
}
