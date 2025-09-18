import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { errorMessages } from '../constants/error-messages.constant';
import { CarReservationByUser } from '../types/car.type';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly BASE_PATH = 'reservations/';

  constructor(private http: HttpClient) {}

  getReservationsByUser(userId: string): Observable<CarReservationByUser[]> {
    return this.http
      .get<CarReservationByUser[]>(`${this.BASE_PATH}/user/${userId}`)
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }
}
