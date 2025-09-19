import { ButtonComponent } from '@/app/components/button/button.component';
import { DropdownComponent } from '@/app/components/dropdown/dropdown.component';
import { FilterButtonComponent } from '@/app/components/filter-button/filter-button.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
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
    ButtonComponent,
    SvgIconComponent,
    RouterLink,
    FilterButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  carTypeList$!: Observable<CarType[]>;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCarTypeList();
  }

  getCarTypeList() {
    this.carTypeList$ = this.carService.getCarType();
  }
}
