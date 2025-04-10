import {FormControl} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';

export interface RegistrationForm {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  birthDate: FormControl<TuiDay | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export type RegistrationFormType = {
  [key in keyof RegistrationForm]: FormControl<RegistrationForm[key]['value']>;
};
