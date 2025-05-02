import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'fill-blank',
  standalone: true,
  templateUrl: './fill-blank.component.html',
  styleUrl: './fill-blank.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillBlankComponent {}
