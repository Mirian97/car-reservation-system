import { LastReservationsComponent } from '@/app/components/last-reservations/last-reservations.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SvgIconComponent, LastReservationsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
