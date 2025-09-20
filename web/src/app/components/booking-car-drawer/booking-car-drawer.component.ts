import { AuthService } from '@/app/auth/auth.service';
import { toast } from '@/app/helpers/toast';
import { ReservationService } from '@/app/services/reservation.service';
import { Car } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-booking-car-drawer',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent],
  templateUrl: './booking-car-drawer.component.html',
})
export class BookingCarDrawerComponent implements OnInit {
  @Input() isOpen = false;
  @Input() car?: Car;
  @Output() closeDrawer = new EventEmitter<void>();
  userId!: string;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUser()?._id || '';
  }

  onClose() {
    this.closeDrawer.emit();
  }

  onCreateReservation() {
    this.isLoading = true;
    this.reservationService
      .create({
        userId: this.userId,
        carId: this.car?._id || '',
      })
      .subscribe({
        next: () => toast.success({ text: 'Carro reservado com sucesso!' }),
        error: (error) => toast.error({ text: error }),
      })
      .add(() => (this.isLoading = false));
  }

  onReleaseCar() {
    this.isLoading = true;
    this.reservationService
      .update('', {
        isActive: false,
      })
      .subscribe({
        next: () => toast.success({ text: 'Carro liberado!' }),
        error: (error) => toast.error({ text: error }),
      })
      .add(() => (this.isLoading = false));
  }
}
