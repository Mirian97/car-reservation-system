import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Car,
  CarType,
  CreateCarForm,
  SearchCarsFilters,
} from '../types/car.type';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly BASE_PATH = 'cars/';

  constructor(private http: HttpClient) {}

  searchCars(filters: Partial<SearchCarsFilters> = {}): Observable<Car[]> {
    return this.http.get<Car[]>(this.BASE_PATH, { params: filters });
  }

  getCarType(): Observable<CarType[]> {
    return this.http.get<CarType[]>(`${this.BASE_PATH}type`);
  }

  create(form: CreateCarForm) {
    return this.http.post(this.BASE_PATH, form);
  }

  delete(carId: string) {
    return this.http.delete(`${this.BASE_PATH}${carId}`);
  }
}
