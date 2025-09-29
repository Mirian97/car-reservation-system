import { ReservationService } from '@/app/services/reservation.service';
import { Car } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BookingCarDrawerComponent } from '../booking-car-drawer/booking-car-drawer.component';
import { CarCardComponent } from '../car-card/car-card.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-last-reservations',
  standalone: true,
  imports: [
    CommonModule,
    CarCardComponent,
    SvgIconComponent,
    BookingCarDrawerComponent,
  ],
  templateUrl: './last-reservations.component.html',
})
export class LastReservationsComponent {
  reservationSevice = inject(ReservationService);

  @Input() title?: string = 'Últimas reservas';
  @Input() clasName?: string = '';
  drawerOpen = false;
  selectedCar?: Car;

  openDrawer(car: Car) {
    this.selectedCar = car;
    this.drawerOpen = true;
  }
}
