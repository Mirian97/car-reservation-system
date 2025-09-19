import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { errorMessages } from '../constants/error-messages.constant';
import { Car } from '../types/car.type';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly BASE_PATH = 'cars/';

  constructor(private http: HttpClient) {}

  searchCars(): Observable<Car[]> {
    return this.http
      .get<Car[]>(this.BASE_PATH)
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }
}
