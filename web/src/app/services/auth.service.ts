import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = `${environment.apiUrl}auth`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/login`, { email, password })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Falha no login'));
        }),
      );
  }
}
