import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { SvgIconComponent } from '../../components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputComponent, LogoComponent, SvgIconComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
