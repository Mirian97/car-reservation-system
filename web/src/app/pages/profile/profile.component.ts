import { AuthService } from '@/app/auth/auth.service';
import { ButtonComponent } from '@/app/components/button/button.component';
import { InputComponent } from '@/app/components/input/input.component';
import { errorMessages } from '@/app/constants/error-messages.constant';
import { toast } from '@/app/helpers/toast';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    readonly formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const user = this.authService.getUser();
    this.profileForm = this.formBuilder.group({
      name: [user?.name || ''],
      email: [user?.email || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });
  }

  onSubmit(): void {
    if (!this.profileForm.valid) {
      toast.error({ text: errorMessages.fillInCorrectly });
      return;
    }
    const formValues = this.profileForm.value;
    this.authService.updateProfile(formValues)?.subscribe({
      next: () => toast.success({ text: 'Seu dados foram atualizados!' }),
      error: (error) => toast.error({ text: error }),
      complete: () => (this.isLoading = false),
    });
  }
}
