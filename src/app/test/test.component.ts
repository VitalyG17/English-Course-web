import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiScrollbarOptionsProvider} from '@taiga-ui/core';

@Component({
  selector: 'test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiScrollbarOptionsProvider({mode: 'hover'})],
})
export class TestComponent {}
