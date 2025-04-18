import {FormControl} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';

export enum RegistrationFormTypeMode {
  REGISTRATION = 0,
  LOGIN = 1,
}

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

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export type LoginFormType = {
  [key in keyof LoginForm]: FormControl<LoginForm[key]['value']>;
};

export interface RegistrationDto {
  name: string | null;
  surname: string | null;
  birthDate: TuiDay | null;
  phoneNumber: string | null;
  email: string | null;
  password: string | null;
}
