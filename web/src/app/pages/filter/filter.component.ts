import { ButtonComponent } from '@/app/components/button/button.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ButtonComponent, SvgIconComponent, RouterLink],
  templateUrl: './filter.component.html',
})
export class FilterComponent {}
