import { navbar } from '@/app/constants/navbar.constant';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, SvgIconComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navbarList = navbar;
}
