import { NavbarComponent } from '@/app/components/navbar/navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
