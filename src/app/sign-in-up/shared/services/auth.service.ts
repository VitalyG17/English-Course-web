import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../shared/types/user';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {AuthResponseDto} from '../auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {RegistrationDto} from '../registrationFormGroup';

@Injectable()
export class AuthService {
  private readonly baseApiurl: string = 'http://localhost:3000/auth';

  public accessToken: string | null = null;
  public refreshToken: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.accessToken;
  }

  public login(user: User): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(`${this.baseApiurl}/login`, user).pipe(
      tap((val: AuthResponseDto) => {
        this.saveTokens(val);
      }),
    );
  }

  public register(user: RegistrationDto): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(`${this.baseApiurl}/register`, user).pipe(
      tap((val: AuthResponseDto) => {
        this.saveTokens(val);
      }),
    );
  }

  public refreshAuthToken() {
    return this.httpClient
      .post<AuthResponseDto>(`${this.baseApiurl}/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val: AuthResponseDto) => this.saveTokens(val)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        }),
      );
  }

  public saveTokens(res: AuthResponseDto) {
    this.accessToken = res.accessToken;
    this.refreshToken = res.refreshToken;

    this.cookieService.set('token', this.accessToken);
    this.cookieService.set('refreshToken', this.refreshToken);
  }

  public logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }
}
