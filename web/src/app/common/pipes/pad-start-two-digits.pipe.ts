import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStartTwoDigits',
  standalone: true,
})
export class PadStartTwoDigitsPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 0 && value < 10) {
      return value.toString().padStart(2, '0');
    }
    return value.toString();
  }
}
