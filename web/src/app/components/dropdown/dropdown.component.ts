import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() title: string = '';
  isOpen = true;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
