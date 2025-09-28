import { PadStartTwoDigitsPipe } from '@/app/common/pipes/pad-start-two-digits.pipe';
import { defaultCreateCar } from '@/app/constants/default-create-car.constant';
import { engineListValues } from '@/app/constants/engine-list.constant';
import { errorMessages } from '@/app/constants/error-messages.constant';
import { seatListValues } from '@/app/constants/seat-list.constants';
import { toast } from '@/app/helpers/toast';
import { CarService } from '@/app/services/car.service';
import { CarType } from '@/app/types/car.type';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'app-create-car-drawer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PadStartTwoDigitsPipe,
    SvgIconComponent,
    ButtonComponent,
    InputComponent,
    ɵInternalFormsSharedModule,
    ToggleButtonComponent,
  ],
  templateUrl: './create-car-drawer.component.html',
})
export class CreateCarDrawerComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() carsUpdated = new EventEmitter<void>();
  carTypeList$!: Observable<CarType[]>;
  createCarForm!: FormGroup;
  isLoading: boolean = false;
  engineList = engineListValues;
  seatList = seatListValues;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private destroyRef: DestroyRef,
  ) {}

  onClose() {
    this.closeDrawer.emit();
    this.createCarForm.reset();
  }

  ngOnInit(): void {
    this.getCarTypeList();
    this.createCarForm = this.formBuilder.group({
      name: [defaultCreateCar.name || '', Validators.required],
      engine: [defaultCreateCar.engine || '', Validators.required],
      size: [defaultCreateCar.size || '', Validators.required],
      type: [defaultCreateCar.type || '', Validators.required],
      year: [defaultCreateCar.year || '', Validators.required],
    });
  }

  getCarTypeList() {
    this.carTypeList$ = this.carService.getCarType();
  }

  onTypeChange(type: CarType): void {
    this.createCarForm.get('type')?.setValue(type);
  }

  onEngineChange(engine: number): void {
    this.createCarForm.get('engine')?.setValue(engine);
  }

  onSizeChange(size: number): void {
    this.createCarForm.get('size')?.setValue(size);
  }

  onSubmit(): void {
    if (this.createCarForm.invalid) {
      toast.error({ text: errorMessages.fillInCorrectly });
      return;
    }
    this.isLoading = true;
    const formValues = this.createCarForm.value;
    this.carService
      .create(formValues)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          toast.success({ text: 'Carro cadastrado!' });
          this.onClose();
          this.carsUpdated.emit();
        },
      })
      .add(() => (this.isLoading = false));
  }
}
