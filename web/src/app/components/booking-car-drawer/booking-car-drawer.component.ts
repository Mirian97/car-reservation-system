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
import { first, Observable } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-booking-car-drawer',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent],
  templateUrl: './booking-car-drawer.component.html',
})
export class BookingCarDrawerComponent {
  private authService = inject(AuthService);
  private carService = inject(CarService);
  private reservationService = inject(ReservationService);

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

  private handleAction<T>(
    action: Observable<T>,
    successMessage: string,
    onSuccessCallback?: () => void,
  ) {
    this.isLoading = true;
    action.pipe(first()).subscribe({
      next: () => {
        toast.success({ text: successMessage });
        this.reservationUpdated.emit();
        onSuccessCallback?.();
        this.onClose();
      },
      error: (err) => console.error(err),
      complete: () => (this.isLoading = false),
    });
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
    this.handleAction(
      this.reservationService.create({
        userId: this.userId,
        carId: this.car._id,
      }),
      'Carro reservado',
    );
  }

  onReleaseCar() {
    const carReservationId = this.carReservation?._id;
    if (!carReservationId) return;
    this.handleAction(
      this.reservationService.update(carReservationId, { isActive: false }),
      'Carro liberado',
    );
  }

  onDeleteCar() {
    const carId = this.car?._id;
    if (!carId) return;
    this.handleAction(this.carService.delete(carId), 'Carro excluído!');
  }
}
