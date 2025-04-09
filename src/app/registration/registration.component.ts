import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiDataList, TuiDateFormat} from '@taiga-ui/core';
import {TuiInputDateModule, TuiInputModule, TuiInputPhoneModule} from '@taiga-ui/legacy';
import {TuiDay} from '@taiga-ui/cdk';
import {TuiDataListWrapper, TuiEmailsPipe} from '@taiga-ui/kit';
import {EmailEnum} from '../../shared/enum/EmailEnum';
import {NgIf} from '@angular/common';

@Component({
  selector: 'registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TuiDateFormat,
    TuiInputDateModule,
    FormsModule,
    TuiInputPhoneModule,
    TuiInputModule,
    TuiDataListWrapper,
    TuiEmailsPipe,
    NgIf,
    TuiDataList,
  ],
})
export class RegistrationComponent {
  protected readonly maxDate: TuiDay = TuiDay.currentLocal();
  protected readonly autocompleteEmails: string[] = Object.values(EmailEnum);

  registrationForm: FormGroup = new FormGroup({
    birthDate: new FormControl<TuiDay | null>(null),
    phoneNumber: new FormControl<string | null>('', Validators.minLength(12)),
    email: new FormControl<string | null>('', Validators.required),
  });
}
