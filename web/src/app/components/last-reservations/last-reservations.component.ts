import { AuthService } from '@/app/auth/auth.service';
import { ReservationService } from '@/app/services/reservation.service';
import { Car, CarReservationByUser } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
export class LastReservationsComponent implements OnInit {
  @Input() title?: string = 'Últimas reservas';
  @Input() clasName?: string = '';
  reservations$!: Observable<CarReservationByUser[]>;
  drawerOpen = false;
  selectedCar?: Car;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    const userId = this.authService.getUser()?._id;
    if (!userId) return;
    this.reservations$ = this.reservationService.getReservationsByUser(userId);
  }

  openDrawer(car: Car) {
    this.selectedCar = car;
    this.drawerOpen = true;
  }
}
