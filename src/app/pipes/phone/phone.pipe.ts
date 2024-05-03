import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})

export class PhonePipe implements PipeTransform {

  transform(value: string | number): string {

    const phone = value.toString();

    const formattedPhone = phone.replace(/(\d{0})(\d{2})(\d{5})/g, '\$1(\$2) \$3-');

    return formattedPhone;
  }
}