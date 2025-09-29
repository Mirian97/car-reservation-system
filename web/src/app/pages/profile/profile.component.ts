import { AuthService } from '@/app/auth/auth.service';
import { ButtonComponent } from '@/app/components/button/button.component';
import { InputComponent } from '@/app/components/input/input.component';
import { SvgIconComponent } from '@/app/components/svg-icon/svg-icon.component';
import { ToggleButtonComponent } from '@/app/components/toggle-button/toggle-button.component';
import { errorMessages } from '@/app/constants/error-messages.constant';
import { passwordMatchValidator } from '@/app/helpers/password-match-validator.helper';
import { toast } from '@/app/helpers/toast';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    ToggleButtonComponent,
    SvgIconComponent,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  profileForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const user = this.authService.getUser();
    this.profileForm = this.formBuilder.group(
      {
        name: [user?.name || ''],
        email: [user?.email || '', [Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [passwordMatchValidator],
      },
    );
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      toast.error({ text: errorMessages.fillInCorrectly });
      return;
    }
    const formValues = this.profileForm.value;
    this.isLoading = true;
    this.authService.updateProfile(formValues)?.subscribe({
      next: () => toast.success({ text: 'Seu dados foram atualizados!' }),
      complete: () => (this.isLoading = false),
    });
  }
}
