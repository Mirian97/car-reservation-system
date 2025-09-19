import { AuthService } from '@/app/auth/auth.service';
import { NavbarComponent } from '@/app/components/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent implements OnInit {
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
