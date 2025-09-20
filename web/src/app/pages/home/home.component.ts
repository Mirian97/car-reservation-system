import { AuthService } from '@/app/auth/auth.service';
import { CreateCarDrawerComponent } from '@/app/components/create-car-drawer/create-car-drawer.component';
import { DebouncedInputComponent } from '@/app/components/debounced-input/debounced-input.component';
import { LastReservationsComponent } from '@/app/components/last-reservations/last-reservations.component';
import { ListCarsComponent } from '@/app/components/list-cars/list-cars.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { ToggleButtonComponent } from '@/app/components/toggle-button/toggle-button.component';
import { objectHasValidProperties } from '@/app/helpers/objectHasValidProperties';
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
    LastReservationsComponent,
    ToggleButtonComponent,
    CreateCarDrawerComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  greeting!: string;
  searchForm!: FormGroup;
  hasFilterActive!: boolean;
  drawerOpen = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getGreeting();
    this.route.queryParams.subscribe((params) => {
      this.hasFilterActive = objectHasValidProperties(params);
      const name = params?.['name'] ?? '';
      this.searchForm = this.formBuilder.group({
        name,
      });
    });
    this.isAdmin = this.authService.isAdmin();
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

  openCreateCarDrawer() {
    this.drawerOpen = true;
  }
}
