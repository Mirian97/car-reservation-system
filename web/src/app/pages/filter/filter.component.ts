import { PadStartTwoDigitsPipe } from '@/app/common/pipes/pad-start-two-digits.pipe';
import { ButtonComponent } from '@/app/components/button/button.component';
import { DropdownComponent } from '@/app/components/dropdown/dropdown.component';
import { FilterButtonComponent } from '@/app/components/filter-button/filter-button.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { ToggleButtonComponent } from '@/app/components/toggle-button/toggle-button.component';
import { defaultCarFilters } from '@/app/constants/default-car-filters.constant';
import { engineListValues } from '@/app/constants/engine-list.constant';
import { seatListValues } from '@/app/constants/seat-list.constants';
import { CarService } from '@/app/services/car.service';
import { CarType, SearchCarsFilters } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PadStartTwoDigitsPipe,
    ButtonComponent,
    SvgIconComponent,
    FilterButtonComponent,
    DropdownComponent,
    ToggleButtonComponent,
  ],
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  carTypeList$!: Observable<CarType[]>;
  engineList = engineListValues;
  seatList = seatListValues;
  filtersForm!: FormGroup;
  previousQueryParams: Partial<SearchCarsFilters> = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCarTypeList();
    this.route.queryParams?.subscribe((params) => {
      this.previousQueryParams = { ...params };
      this.filtersForm = this.formBuilder.group({
        name: [params?.['name'] || defaultCarFilters.name],
        type: [params?.['type'] || defaultCarFilters.type],
        engine: [params?.['engine']?.map(Number) || defaultCarFilters.engine],
        size: [params?.['size']?.map(Number) || defaultCarFilters.size],
      });
    });
  }

  getCarTypeList() {
    this.carTypeList$ = this.carService.getCarType();
  }

  onTypeChange(type: CarType, event: Event): void {
    const input = event.target as HTMLInputElement;
    const currentTypes: CarType[] = this.filtersForm.get('type')?.value || [];

    if (input.checked) {
      this.filtersForm.get('type')?.setValue([...currentTypes, type]);
    } else {
      this.filtersForm
        .get('type')
        ?.setValue(currentTypes.filter((t) => t !== type));
    }
  }

  onEngineToggle(engine: number): void {
    const currentEngines: number[] =
      this.filtersForm.get('engine')?.value || [];
    const isEngineActive = currentEngines.includes(engine);

    if (isEngineActive) {
      this.filtersForm
        .get('engine')
        ?.setValue(currentEngines.filter((e) => e !== engine));
    } else {
      this.filtersForm.get('engine')?.setValue([...currentEngines, engine]);
    }
  }

  onSizeToggle(size: number): void {
    const currentSizes: number[] = this.filtersForm.get('size')?.value || [];
    const isSizeActive = currentSizes.includes(size);

    if (isSizeActive) {
      this.filtersForm
        .get('size')
        ?.setValue(currentSizes.filter((s) => s !== size));
    } else {
      this.filtersForm.get('size')?.setValue([...currentSizes, size]);
    }
  }

  applyFilters(): void {
    const filters = this.filtersForm.value;
    this.router.navigate(['/inicio'], {
      queryParams: filters,
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
    this.filtersForm.reset(defaultCarFilters);
    this.router.navigate([], {
      queryParams: {},
    });
  }

  quitFilters() {
    this.router.navigate(['/inicio'], {
      queryParams: this.previousQueryParams,
    });
  }
}
