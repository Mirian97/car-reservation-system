import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() isLoading?: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.toggle.emit();
    }
  }
}
