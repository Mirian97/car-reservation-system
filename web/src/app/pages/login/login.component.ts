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
import { LogoComponent } from '../../components/logo/logo.component';
import { SvgIconComponent } from '../../components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LogoComponent,
    SvgIconComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    readonly formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      toast.error({ text: 'Por favor, preencha os dados corretamente' });
      return;
    }
    const formValues = this.loginForm.value;
    this.authService.login(formValues).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error) => toast.error({ text: error }),
      complete: () => (this.isLoading = false),
    });
  }
}
