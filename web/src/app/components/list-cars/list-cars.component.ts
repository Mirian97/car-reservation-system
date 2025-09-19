import { CarService } from '@/app/services/car.service';
import { Car } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CarCardComponent } from '../car-card/car-card.component';
import { NoCarResultsComponent } from '../no-car-results/no-car-results.component';

@Component({
  selector: 'app-list-cars',
  standalone: true,
  imports: [CommonModule, CarCardComponent, NoCarResultsComponent],
  templateUrl: './list-cars.component.html',
})
export class ListCarsComponent {
  cars$!: Observable<Car[]>;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.searchCars();
  }

  searchCars(): void {
    this.cars$ = this.carService.searchCars();
  }
}
