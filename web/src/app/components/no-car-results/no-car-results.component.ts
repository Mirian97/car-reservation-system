import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-no-car-results',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './no-car-results.component.html',
})
export class NoCarResultsComponent {}
