import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginForm, Token } from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = `${environment.apiUrl}auth`;
  constructor(private http: HttpClient) {}

  login(form: LoginForm): Observable<any> {
    return this.http
      .post<Token>(`${this.API_URL}/login`, form)
      .pipe(
        catchError((error) =>
          throwError(
            () => error.message || 'Falha inesperada, tente novamente',
          ),
        ),
      );
  }
}
