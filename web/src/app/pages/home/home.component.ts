import { AuthService } from '@/app/auth/auth.service';
import { CreateCarDrawerComponent } from '@/app/components/create-car-drawer/create-car-drawer.component';
import { DebouncedInputComponent } from '@/app/components/debounced-input/debounced-input.component';
import { LastReservationsComponent } from '@/app/components/last-reservations/last-reservations.component';
import { ListCarsComponent } from '@/app/components/list-cars/list-cars.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { ToggleButtonComponent } from '@/app/components/toggle-button/toggle-button.component';
import { objectHasValidProperties } from '@/app/helpers/object-has-valid-properties.helper';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

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
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  drawerOpen = false;
  searchForm!: FormGroup;
  hasFilterActive$: Observable<boolean> = this.route.queryParams.pipe(
    map((params) => objectHasValidProperties(params)),
  );

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
    this.route.queryParams.subscribe((params) => {
      this.searchForm.patchValue({ name: params?.['name'] ?? '' });
    });
  }

  onSearch(value: string) {
    const queryParams = value ? { name: value } : {};
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onNavigateFilters(): void {
    const params = this.route.snapshot.queryParams;
    this.router.navigate(['/inicio/filtrar'], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  openCreateCarDrawer() {
    this.drawerOpen = true;
  }
}
