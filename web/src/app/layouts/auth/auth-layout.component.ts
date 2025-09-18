import { NavbarComponent } from '@/app/components/navbar/navbar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
