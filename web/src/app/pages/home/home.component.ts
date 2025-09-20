import { AuthService } from '@/app/auth/auth.service';
import { DebouncedInputComponent } from '@/app/components/debounced-input/debounced-input.component';
import { ListCarsComponent } from '@/app/components/list-cars/list-cars.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  searchForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getGreeting();
    this.route.queryParams.subscribe((params) => {
      const name = params?.['name'] ?? '';
      this.searchForm = this.formBuilder.group({
        name,
      });
    });
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

  onNavigateFilters(): void {
    this.route.queryParams.subscribe((params) => {
      this.router.navigate(['/inicio/filtrar'], {
        queryParams: params,
        queryParamsHandling: 'merge',
      });
    });
  }
}
