import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'multiple-choice',
  standalone: true,
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleChoiceComponent {}
