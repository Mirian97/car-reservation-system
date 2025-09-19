import { AuthService } from '@/app/auth/auth.service';
import { LastReservationsComponent } from '@/app/components/last-reservations/last-reservations.component';
import { ListCarsComponent } from '@/app/components/list-cars/list-cars.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SvgIconComponent, LastReservationsComponent, ListCarsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  greeting!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getGreeting();
  }

  getGreeting(): void {
    const userName = this.authService.getUser()?.name;
    this.greeting = userName ? `Olá, ${userName}` : 'Olá!';
  }
}
