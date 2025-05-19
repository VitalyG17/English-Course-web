import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton, TuiLoader, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {Router, RouterLink} from '@angular/router';
import {ReformDatePipe} from '../../../shared/pipes/reform-date.pipe';
import {PercentageCorrectPipe} from '../../../shared/pipes/percentage-correct.pipe';

interface State {
  navigationId: number;
  totalTasks: number;
  errors: number;
  timeSpent: number;
}

@Component({
  selector: 'result-page',
  standalone: true,
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    TuiAppearance,
    TuiCardLarge,
    TuiLoader,
    RouterLink,
    TuiButton,
    TuiHeader,
    TuiSurface,
    TuiTitle,
    ReformDatePipe,
    PercentageCorrectPipe,
  ],
})
export class ResultPageComponent {
  protected readonly isLoading: WritableSignal<boolean> = signal(false);

  private readonly router: Router = inject(Router);

  protected timeSpent: number = 0;
  protected errors: number = 0;
  protected totalTasks: number = 0;

  constructor() {
    const state: State = this.router.getCurrentNavigation()?.extras.state || history.state;
    this.timeSpent = state?.timeSpent || 0;
    this.errors = state?.errors || 0;
    this.totalTasks = state?.totalTasks || 0;
  }
}
