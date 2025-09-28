import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private carSubject = new BehaviorSubject<Car[]>([]);
  cars$ = this.carSubject.asObservable();

  constructor(private http: HttpClient) {
    this.searchCars();
  }

  searchCars(filters: Partial<SearchCarsFilters> = {}) {
    this.http
      .get<Car[]>(this.BASE_PATH, { params: filters })
      .subscribe((data) => this.carSubject.next(data));
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
