import { PluralizePipe } from '@/app/common/pipes/pluralize.pipe';
import { Car } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-booking-car-drawer',
  standalone: true,
  imports: [CommonModule, PluralizePipe, SvgIconComponent],
  templateUrl: './booking-car-drawer.component.html',
})
export class BookingCarDrawerComponent {
  @Input() isOpen = false;
  @Input() car?: Car;
  @Output() closeDrawer = new EventEmitter<void>();

  onClose() {
    this.closeDrawer.emit();
  }
}
