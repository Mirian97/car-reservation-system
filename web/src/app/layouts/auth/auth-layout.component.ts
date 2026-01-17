import { AuthService } from '@/app/auth/auth.service';
import { InitialsNamePipe } from '@/app/common/pipes/initials-name.pipe';
import { NavbarComponent } from '@/app/components/navbar/navbar.component';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, InitialsNamePipe],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent implements OnInit {
  authService = inject(AuthService);
  greeting!: string;
  isImageLoaded = false;

  ngOnInit(): void {
    this.getGreeting();
  }

  getGreeting(): void {
    const userName = this.authService.getUser()?.name;
    this.greeting = userName ? `Olá, ${userName}` : 'Olá!';
  }

  onImageLoad(): void {
    this.isImageLoaded = true;
  }
}
