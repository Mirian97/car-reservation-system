import { PluralizePipe } from '@/app/common/pipes/pluralize.pipe';
import { Car } from '@/app/types/car.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [PluralizePipe],
  templateUrl: './car-card.component.html',
})
export class CarCardComponent {
  @Input() car!: Car;
}
