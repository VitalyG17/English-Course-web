import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';

@Component({
  selector: 'error-component',
  standalone: true,
  templateUrl: './error-component.component.html',
  styleUrl: './error-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton],
})
export class ErrorComponentComponent {
  protected goBack(): void {
    window.history.back();
  }
}
