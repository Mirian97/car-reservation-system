import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private carsSubject = new BehaviorSubject<Car[]>([]);
  private carListTypeSubject = new BehaviorSubject<CarType[]>([]);
  cars$ = this.carsSubject.asObservable();
  carListType$ = this.carListTypeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.searchCars();
    this.getCarType();
  }

  searchCars(filters: Partial<SearchCarsFilters> = {}) {
    this.http
      .get<Car[]>(this.BASE_PATH, { params: filters })
      .subscribe((data) => this.carsSubject.next(data));
  }

  getCarType(): void {
    this.http.get<CarType[]>(`${this.BASE_PATH}type`).subscribe((data) => {
      this.carListTypeSubject.next(data);
    });
  }

  create(form: CreateCarForm) {
    return this.http.post(this.BASE_PATH, form);
  }

  delete(carId: string) {
    return this.http.delete(`${this.BASE_PATH}${carId}`);
  }
}
