import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CarReservationByUser } from '../types/car.type';
import {
  CreateReservation,
  Reservation,
  UpdateReservation,
} from '../types/reservation.type';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly BASE_PATH = 'reservations/';

  private reservationsByUserSubject = new BehaviorSubject<
    CarReservationByUser[]
  >([]);
  reservationsByUser$ = this.reservationsByUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private carService: CarService,
  ) {
    this.getReservationsByUser();
  }

  getReservationsByUser(): void {
    this.http
      .get<CarReservationByUser[]>(
        `${this.BASE_PATH}user/${this.authService.getUser()?._id}`,
      )
      .subscribe((data) => {
        this.reservationsByUserSubject.next(data);
      });
  }

  getCarWithActiveReservation(carId: string): Observable<Reservation | null> {
    return this.http.get<Reservation | null>(`${this.BASE_PATH}car/${carId}`);
  }

  create(form: CreateReservation) {
    return this.http.post(this.BASE_PATH, form).pipe(
      tap(() => {
        this.getReservationsByUser();
        this.carService.searchCars();
      }),
    );
  }

  update(reservationId: string, form: UpdateReservation) {
    return this.http
      .patch(`${this.BASE_PATH}${reservationId}`, form)
      .pipe(tap(() => this.getReservationsByUser()));
  }
}
