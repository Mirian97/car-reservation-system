import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarReservationByUser } from '../types/car.type';
import {
  CreateReservation,
  Reservation,
  UpdateReservation,
} from '../types/reservation.type';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly BASE_PATH = 'reservations/';

  constructor(private http: HttpClient) {}

  getReservationsByUser(userId: string): Observable<CarReservationByUser[]> {
    return this.http.get<CarReservationByUser[]>(
      `${this.BASE_PATH}user/${userId}`,
    );
  }

  getCarWithActiveReservation(carId: string): Observable<Reservation | null> {
    return this.http.get<Reservation | null>(`${this.BASE_PATH}car/${carId}`);
  }

  create(form: CreateReservation) {
    return this.http.post(this.BASE_PATH, form);
  }

  update(reservationId: string, form: UpdateReservation) {
    return this.http.patch(`${this.BASE_PATH}${reservationId}`, form);
  }
}
