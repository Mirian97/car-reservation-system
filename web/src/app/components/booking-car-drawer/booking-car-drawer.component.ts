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
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Output() reservationUpdated = new EventEmitter<void>();
  @Input() showAdminActions?: boolean = false;
  userId!: string;
  isLoading: boolean = false;
  carReservation: Reservation | null = null;

  constructor(
    private authService: AuthService,
    private carService: CarService,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUser()?._id || '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['car'] && this.car?._id) {
      this.getCarReservation();
    }
  }

  onClose() {
    this.closeDrawer.emit();
  }

  getCarReservation() {
    const carId = this.car?._id;
    if (!carId) return;
    this.reservationService.getCarWithActiveReservation(carId).subscribe({
      next: (response) => {
        this.carReservation = response;
      },
      error: () => (this.carReservation = null),
    });
  }

  onCreateReservation() {
    this.isLoading = true;
    this.reservationService
      .create({
        userId: this.userId,
        carId: this.car?._id || '',
      })
      .subscribe({
        next: () => {
          toast.success({ text: 'Carro reservado com sucesso!' });
          this.reservationUpdated.emit();
          this.onClose();
        },
        error: (error) => toast.error({ text: error }),
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
      .subscribe({
        next: () => {
          toast.success({ text: 'Carro liberado!' });
          this.reservationUpdated.emit();
          this.onClose();
        },
        error: (error) => toast.error({ text: error }),
      })
      .add(() => (this.isLoading = false));
  }

  onDeleteCar() {
    const carId = this.car?._id;
    if (!carId) return;
    this.isLoading = true;
    this.carService
      .delete(carId)
      .subscribe({
        next: () => {
          toast.success({ text: 'Carro excluído com sucesso!' });
          this.reservationUpdated.emit();
          this.onClose();
        },
        error: (error) => toast.error({ text: error }),
      })
      .add(() => (this.isLoading = false));
  }
}
