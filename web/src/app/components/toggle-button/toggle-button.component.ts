import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-button.component.html',
})
export class ToggleButtonComponent {
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = '';
  @Input() onClick?: () => void = () => {};
  @Input() isActive?: boolean = false;
}
