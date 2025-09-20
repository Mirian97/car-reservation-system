import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { errorMessages } from '../constants/error-messages.constant';
import { Car, CarType, SearchCarsFilters } from '../types/car.type';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly BASE_PATH = 'cars/';

  constructor(private http: HttpClient) {}

  searchCars(filters: Partial<SearchCarsFilters> = {}): Observable<Car[]> {
    return this.http
      .get<Car[]>(this.BASE_PATH, { params: filters })
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }

  getCarType(): Observable<CarType[]> {
    return this.http
      .get<CarType[]>(`${this.BASE_PATH}type`)
      .pipe(
        catchError((error) =>
          throwError(() => error.error.message || errorMessages.unexpected),
        ),
      );
  }
}
