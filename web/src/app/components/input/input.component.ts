import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() type?: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder?: string = '';
  @Input() value?: string = '';
  @Input() disabled?: boolean = false;
  @Input() className?: string = '';
  @Input() onChange?: (event: Event) => void = () => {};
}
