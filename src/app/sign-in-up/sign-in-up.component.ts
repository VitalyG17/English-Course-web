import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  TuiDataList,
  TuiTextfield,
  TuiDateFormat,
  TuiIcon,
  TuiAppearance,
  TuiTitle,
  TuiError,
  TuiButton,
} from '@taiga-ui/core';
import {TuiInputDateModule, TuiInputModule, TuiInputPhoneModule} from '@taiga-ui/legacy';
import {TuiDay} from '@taiga-ui/cdk';
import {TuiDataListWrapper, TuiEmailsPipe, TuiFieldErrorPipe, TuiPassword, TuiSegmented} from '@taiga-ui/kit';
import {EmailEnum} from '../../shared/enum/EmailEnum';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoginFormType, RegistrationFormType, RegistrationFormTypeMode} from './shared/registrationFormGroup';
import {TuiForm, TuiHeader} from '@taiga-ui/layout';
import {Router} from '@angular/router';
import {Subject, takeUntil, tap} from 'rxjs';
import {AuthService} from './shared/services/auth.service';
import {SnackBarService} from '../../shared/services/snack-bar.service';

@Component({
  selector: 'sign-in-up',
  standalone: true,
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss',
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
    TuiButton,
    TuiSegmented,
  ],
  providers: [SnackBarService],
})
export class SignInUpComponent implements OnInit, OnDestroy {
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  private readonly snackBarService: SnackBarService = inject(SnackBarService);

  private readonly destroy$: Subject<void> = new Subject<void>();

  protected readonly maxDate: TuiDay = TuiDay.currentLocal();
  protected readonly autocompleteEmails: string[] = Object.values(EmailEnum);
  protected readonly RegistrationFormTypeMode: typeof RegistrationFormTypeMode = RegistrationFormTypeMode;

  protected modeControl: FormControl<RegistrationFormTypeMode> = new FormControl<RegistrationFormTypeMode>(
    RegistrationFormTypeMode.LOGIN,
    {nonNullable: true},
  );

  protected get currentForm(): FormGroup {
    return this.modeControl.value === RegistrationFormTypeMode.REGISTRATION ? this.registrationForm : this.loginForm;
  }

  protected registrationForm: FormGroup<RegistrationFormType> = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    surname: new FormControl<string | null>(null, Validators.required),
    birthDate: new FormControl<TuiDay | null>(null, Validators.required),
    phoneNumber: new FormControl<string | null>(null, Validators.minLength(12)),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
  });

  protected loginForm: FormGroup<LoginFormType> = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, Validators.required),
  });

  protected onSubmit() {
    this.modeControl.value === RegistrationFormTypeMode.LOGIN ? this.submitLogin() : this.submitRegistration();
  }

  private submitRegistration(): void {
    this.registrationForm.markAllAsTouched();
    this.registrationForm.updateValueAndValidity();

    if (this.registrationForm.valid) {
      this.authService
        .register(this.registrationForm.getRawValue())
        .pipe(
          takeUntil(this.destroy$),
          tap(() => {
            this.snackBarService.successShow('Вы успешно зарегистрировались!');
            this.modeControl.setValue(RegistrationFormTypeMode.LOGIN);
          }),
        )
        .subscribe();
    } else {
      this.snackBarService.errorShow('Ошибка авторизации');
    }
  }

  private submitLogin(): void {
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();

    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate(['/profile']);
        });
    } else {
      this.snackBarService.errorShow('Пожалуйста, введите корректные email и пароль.');
    }
  }

  public ngOnInit(): void {
    this.modeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.registrationForm.reset();
      this.loginForm.reset();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
