import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() type?: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder?: string = '';
  @Input() disabled?: boolean = false;
  @Input() className?: string = '';
  @Input() showError?: boolean = false;
  @Input() name?: string = '';
  value: string = '';

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: typeof this.onChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: typeof this.onTouched): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
