import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
