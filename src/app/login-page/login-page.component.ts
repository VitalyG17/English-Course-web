import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
