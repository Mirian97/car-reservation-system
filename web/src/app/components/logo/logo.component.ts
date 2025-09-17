import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() className?: string = '';
}
