import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-button.component.html',
})
export class FilterButtonComponent {
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = '';
  @Input() onClick?: () => void = () => {};
}
