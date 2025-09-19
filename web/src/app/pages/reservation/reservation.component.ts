import { LastReservationsComponent } from '@/app/components/last-reservations/last-reservations.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [LastReservationsComponent],
  templateUrl: './reservation.component.html',
})
export class ReservationComponent {}
