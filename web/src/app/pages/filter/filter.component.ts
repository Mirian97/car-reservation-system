import { PadStartTwoDigitsPipe } from '@/app/common/pipes/pad-start-two-digits.pipe';
import { ButtonComponent } from '@/app/components/button/button.component';
import { DropdownComponent } from '@/app/components/dropdown/dropdown.component';
import { FilterButtonComponent } from '@/app/components/filter-button/filter-button.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { ToggleButtonComponent } from '@/app/components/toggle-button/toggle-button.component';
import { engineListValues } from '@/app/constants/engine-list.constants';
import { seatListValues } from '@/app/constants/seat-list.constants';
import { CarService } from '@/app/services/car.service';
import { CarType } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCarTypeList();
  }

  getCarTypeList() {
    this.carTypeList$ = this.carService.getCarType();
  }
}
