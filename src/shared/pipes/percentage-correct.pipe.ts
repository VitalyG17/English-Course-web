import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'percentageCorrect',
  standalone: true,
})
export class PercentageCorrectPipe implements PipeTransform {
  transform(totalTasks: number, errors: number): number {
    if (totalTasks === 0) {
      return 0;
    }
    return Math.round(((totalTasks - errors) / totalTasks) * 100);
  }
}
