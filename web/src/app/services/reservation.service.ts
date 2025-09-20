import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { errorMessages } from '../constants/error-messages.constant';
import { CarReservationByUser } from '../types/car.type';
import {
  CreateReservation,
  UpdateReservation,
} from '../types/reservation.type';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly BASE_PATH = 'reservations/';

  constructor(private http: HttpClient) {}

  getReservationsByUser(userId: string): Observable<CarReservationByUser[]> {
    return this.http
      .get<CarReservationByUser[]>(`${this.BASE_PATH}user/${userId}`)
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }

  create(form: CreateReservation) {
    return this.http
      .post(this.BASE_PATH, form)
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }

  update(reservationId: string, form: UpdateReservation) {
    return this.http
      .patch(`${this.BASE_PATH}${reservationId}`, form)
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }
}
