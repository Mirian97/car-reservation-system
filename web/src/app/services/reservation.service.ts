import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { errorMessages } from '../constants/error-messages.constant';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly BASE_PATH = 'reservations/';

  constructor(private http: HttpClient) {}

  getReservationsByUser(userId: string): Observable<[]> {
    return this.http.get<[]>(`${this.BASE_PATH}/user/${userId}`).pipe(
      tap((response: []) => {
        if (response) {
        }
      }),
      catchError((error) =>
        throwError(() => error.error.message || errorMessages.unexpected),
      ),
    );
  }
}
