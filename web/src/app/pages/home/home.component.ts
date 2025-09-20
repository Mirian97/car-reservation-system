import { AuthService } from '@/app/auth/auth.service';
import { DebouncedInputComponent } from '@/app/components/debounced-input/debounced-input.component';
import { ListCarsComponent } from '@/app/components/list-cars/list-cars.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SvgIconComponent,
    ListCarsComponent,
    RouterLink,
    DebouncedInputComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  greeting!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getGreeting();
  }

  getGreeting(): void {
    const userName = this.authService.getUser()?.name;
    this.greeting = userName ? `Olá, ${userName}` : 'Olá!';
  }

  onSearch(value: string) {
    this.router.navigate([], {
      queryParams: { name: value || null },
      queryParamsHandling: 'merge',
    });
  }
}
