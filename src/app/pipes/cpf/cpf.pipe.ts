import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true
})

export class CpfPipe implements PipeTransform {

  transform(value: string | number): string {

    const cpf = value.toString();

    const formattedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');

    return formattedCpf;
  }
}