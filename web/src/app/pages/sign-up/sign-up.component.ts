import { errorMessages } from '@/app/constants/error-messages.constant';
import { toast } from '@/app/helpers/toast';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { SvgIconComponent } from '../../components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
    InputComponent,
    SvgIconComponent,
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    readonly formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      toast.error({ text: errorMessages.fillInCorrectly });
      return;
    }
    this.isLoading = true;
    const formValues = this.signUpForm.value;
    this.authService
      .signUp(formValues)
      .subscribe({
        next: () => this.router.navigate(['/inicio']),
        error: (error) => toast.error({ text: error }),
      })
      .add(() => (this.isLoading = false));
  }
}
