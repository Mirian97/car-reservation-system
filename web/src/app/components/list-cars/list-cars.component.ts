import { AuthService } from '@/app/auth/auth.service';
import { CarService } from '@/app/services/car.service';
import { Car, SearchCarsFilters } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
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
export class ListCarsComponent implements OnInit {
  authService = inject(AuthService);
  carService = inject(CarService);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);

  drawerOpen = false;
  selectedCar?: Car;

  ngOnInit(): void {
    this.searchCars();
  }

  searchCars(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params) => {
        const filters: Partial<SearchCarsFilters> = {
          name: params['name'] || '',
          type: params['type'] || [],
          engine: params['engine'] || [],
          size: params['size'] || [],
        };
        this.carService.searchCars(filters);
      });
  }

  openDrawer(car: Car) {
    this.selectedCar = car;
    this.drawerOpen = true;
  }
}
