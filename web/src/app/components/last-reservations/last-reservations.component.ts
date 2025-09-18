import { AuthService } from '@/app/auth/auth.service';
import { ReservationService } from '@/app/services/reservation.service';
import { CarReservationByUser } from '@/app/types/car.type';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-last-reservations',
  standalone: true,
  imports: [],
  templateUrl: './last-reservations.component.html',
})
export class LastReservationsComponent implements OnInit {
  reservations$!: Observable<CarReservationByUser[]>;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  getReservations(): void {
    const userId = this.authService.getUser()?._id;
    if (!userId) return;
    this.reservations$ = this.reservationService.getReservationsByUser(userId);
  }
}
