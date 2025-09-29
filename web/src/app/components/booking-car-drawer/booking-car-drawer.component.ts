import { AuthService } from '@/app/auth/auth.service';
import { toast } from '@/app/helpers/toast';
import { CarService } from '@/app/services/car.service';
import { ReservationService } from '@/app/services/reservation.service';
import { Car } from '@/app/types/car.type';
import { Reservation } from '@/app/types/reservation.type';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { first } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-booking-car-drawer',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent],
  templateUrl: './booking-car-drawer.component.html',
})
export class BookingCarDrawerComponent {
  authService = inject(AuthService);
  carService = inject(CarService);
  reservationService = inject(ReservationService);

  @Input() isOpen = false;
  @Input() car?: Car;
  @Input() showAdminActions?: boolean = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() reservationUpdated = new EventEmitter<void>();
  userId: string = this.authService.getUser()?._id || '';
  isLoading: boolean = false;
  carReservation: Reservation | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['car'] && this.car?._id) {
      this.getCarReservation();
    }
  }

  onClose() {
    this.closeDrawer.emit();
  }

  private onSuccess(message: string) {
    toast.success({ text: message });
    this.reservationUpdated.emit();
    this.onClose();
  }

  getCarReservation() {
    const carId = this.car?._id;
    if (!carId) return;
    this.reservationService
      .getCarWithActiveReservation(carId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.carReservation = response;
        },
        error: () => (this.carReservation = null),
      });
  }

  onCreateReservation() {
    if (!this.userId || !this.car?._id) return;
    this.isLoading = true;
    this.reservationService
      .create({
        userId: this.userId,
        carId: this.car?._id,
      })
      .pipe(first())
      .subscribe({
        next: () => this.onSuccess('Carro reservado'),
      })
      .add(() => (this.isLoading = false));
  }

  onReleaseCar() {
    const carReservationId = this.carReservation?._id;
    if (!carReservationId) return;
    this.isLoading = true;
    this.reservationService
      .update(carReservationId, {
        isActive: false,
      })
      .pipe(first())
      .subscribe({
        next: () => this.onSuccess('Carro liberado'),
      })
      .add(() => (this.isLoading = false));
  }

  onDeleteCar() {
    const carId = this.car?._id;
    if (!carId) return;
    this.isLoading = true;
    this.carService
      .delete(carId)
      .pipe(first())
      .subscribe({
        next: () => this.onSuccess('Carro excluído!'),
      })
      .add(() => (this.isLoading = false));
  }
}
