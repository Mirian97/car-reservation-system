import { PluralizePipe } from '@/app/common/pipes/pluralize.pipe';
import { Car } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [PluralizePipe, CommonModule],
  templateUrl: './car-card.component.html',
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() disabled?: boolean = false;
  @Input() showStatus: boolean = false;
  @Output() click = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.click.emit();
    }
  }
}
