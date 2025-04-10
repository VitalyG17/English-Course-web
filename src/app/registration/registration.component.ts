import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiDataList, TuiTextfield, TuiDateFormat, TuiIcon, TuiAppearance, TuiTitle, TuiError} from '@taiga-ui/core';
import {TuiInputDateModule, TuiInputModule, TuiInputPhoneModule} from '@taiga-ui/legacy';
import {TuiDay} from '@taiga-ui/cdk';
import {TuiDataListWrapper, TuiEmailsPipe, TuiFieldErrorPipe, TuiPassword} from '@taiga-ui/kit';
import {EmailEnum} from '../../shared/enum/EmailEnum';
import {AsyncPipe, NgIf} from '@angular/common';
import {RegistrationFormType} from './shared/registrationFormGroup';
import {TuiForm, TuiHeader} from '@taiga-ui/layout';

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
    TuiTextfield,
    TuiPassword,
    TuiIcon,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiForm,
    TuiAppearance,
    TuiHeader,
    TuiTitle,
  ],
})
export class RegistrationComponent {
  protected readonly maxDate: TuiDay = TuiDay.currentLocal();
  protected readonly autocompleteEmails: string[] = Object.values(EmailEnum);

  registrationForm: FormGroup<RegistrationFormType> = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
    surname: new FormControl<string | null>('', Validators.required),
    birthDate: new FormControl<TuiDay | null>(null, Validators.required),
    phoneNumber: new FormControl<string | null>('', Validators.minLength(12)),
    email: new FormControl<string | null>('', Validators.required),
    password: new FormControl<string | null>('', [Validators.required, Validators.minLength(8)]),
  });
}
