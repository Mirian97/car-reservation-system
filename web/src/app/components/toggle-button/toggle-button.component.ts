import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() isActive?: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.toggle.emit();
    }
  }
}
