import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'profile-page',
  standalone: false,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {}
