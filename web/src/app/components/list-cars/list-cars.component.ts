import { CarService } from '@/app/services/car.service';
import { Car, SearchCarsFilters } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingCarDrawerComponent } from '../booking-car-drawer/booking-car-drawer.component';
import { CarCardComponent } from '../car-card/car-card.component';
import { NoCarResultsComponent } from '../no-car-results/no-car-results.component';

@Component({
  selector: 'app-list-cars',
  standalone: true,
  imports: [
    CommonModule,
    CarCardComponent,
    NoCarResultsComponent,
    BookingCarDrawerComponent,
  ],
  templateUrl: './list-cars.component.html',
})
export class ListCarsComponent {
  cars$!: Observable<Car[]>;
  drawerOpen = false;
  selectedCar?: Car;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchCars();
  }

  searchCars(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const filters: Partial<SearchCarsFilters> = {
        name: params['name'] || '',
        type: params['type'] || [],
        engine: params['engine'] || [],
        size: params['size'] || [],
      };
      this.cars$ = this.carService.searchCars(filters);
    });
  }

  openDrawer(car: Car) {
    this.selectedCar = car;
    this.drawerOpen = true;
  }
}
