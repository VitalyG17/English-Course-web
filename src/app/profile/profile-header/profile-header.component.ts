import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiFallbackSrcPipe} from '@taiga-ui/core';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'profile-header',
  standalone: true,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiAvatar, TuiFallbackSrcPipe, AsyncPipe],
})
export class ProfileHeaderComponent {
  @Input()
  public name: string | null = null;

  @Input()
  public surname: string | null = null;

  @Input()
  public email: string | null = null;
}
