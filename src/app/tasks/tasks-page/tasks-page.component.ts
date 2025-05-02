import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TASK_TYPE_TITLES, TaskType} from '../shared/enum/TaskType';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {MatchPairsComponent} from '../match-pairs/match-pairs.component';
import {FillBlankComponent} from '../fill-blank/fill-blank.component';
import {MultipleChoiceComponent} from '../multiple-choice/multiple-choice.component';
import {TuiAppearance} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {TuiProgressBar, TuiProgressSegmented} from '@taiga-ui/kit';

@Component({
  selector: 'tasks-page',
  standalone: true,
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgSwitch,
    NgSwitchCase,
    MatchPairsComponent,
    FillBlankComponent,
    MultipleChoiceComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiProgressBar,
    TuiProgressSegmented,
  ],
})
export class TasksPageComponent {
  protected taskTypeEnum: typeof TaskType = TaskType;

  protected currentTask = {
    type: this.taskTypeEnum.MATCHING,
  };

  get taskTitle(): string {
    return TASK_TYPE_TITLES[this.currentTask.type];
  }
}
