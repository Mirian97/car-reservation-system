import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsName',
  standalone: true,
})
export class InitialsNamePipe implements PipeTransform {
  transform(name: string = ''): string {
    if (!name) return '';
    const names = name.trim().split(' ');
    const firstInitial = names[0].charAt(0).toUpperCase();

    if (names.length === 1) return firstInitial;

    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }
}
