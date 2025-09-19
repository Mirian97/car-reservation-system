import { LastReservationsComponent } from '@/app/components/last-reservations/last-reservations.component';
import { ListCarsComponent } from '@/app/components/list-cars/list-cars.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SvgIconComponent, LastReservationsComponent, ListCarsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
