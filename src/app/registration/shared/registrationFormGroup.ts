import {FormControl} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';

export interface RegistrationForm {
  birthDate: FormControl<TuiDay | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
}

export type RegistrationFormType = {
  [key in keyof RegistrationForm]: FormControl<RegistrationForm[key]['value']>;
};
