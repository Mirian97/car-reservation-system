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
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    PadStartTwoDigitsPipe,
    ButtonComponent,
    SvgIconComponent,
    RouterLink,
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
  filters: Partial<SearchCarsFilters> = defaultCarFilters;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.getCarTypeList();
  }

  getCarTypeList() {
    this.carTypeList$ = this.carService.getCarType();
  }

  onTypeChange(type: CarType, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.filters.type = [...(this.filters.type || []), type];
    } else {
      this.filters.type = this.filters.type?.filter((t) => t !== type);
    }
  }

  onEngineToggle(engine: number): void {
    const isEngineActive = this.filters?.engine?.includes(engine);
    if (isEngineActive) {
      this.filters.engine = this.filters.engine?.filter((e) => e !== engine);
    } else {
      this.filters.engine = [...(this.filters.engine || []), engine];
    }
  }

  onSizeToggle(size: number): void {
    const isSizeActive = this.filters?.size?.includes(size);
    if (isSizeActive) {
      this.filters.size = this.filters.size?.filter((e) => e !== size);
    } else {
      this.filters.size = [...(this.filters.size || []), size];
    }
  }

  applyFilters(): void {
    const queryParams: any = {};
    if (this.filters.name) queryParams.name = this.filters.name;
    if (this.filters.type?.length)
      queryParams.type = this.filters.type.join(',');
    if (this.filters.engine?.length)
      queryParams.engine = this.filters.engine.join(',');
    if (this.filters.size?.length)
      queryParams.size = this.filters.size.join(',');
    this.router.navigate(['/inicio'], { queryParams });
  }

  clearFilters(): void {
    this.filters = defaultCarFilters;
    this.router.navigate(['/inicio'], { queryParams: {} });
  }
}
