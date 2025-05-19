import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reformDate',
  standalone: true,
})
export class ReformDatePipe implements PipeTransform {
  transform(seconds: number): string {
    if (!seconds && seconds !== 0) {
      return '0 мин 0 сек';
    }
    return `${Math.floor(seconds / 60)} мин ${seconds % 60} сек`;
  }
}
