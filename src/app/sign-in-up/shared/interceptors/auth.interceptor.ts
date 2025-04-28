import {HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {BehaviorSubject, catchError, filter, Observable, switchMap, tap, throwError} from 'rxjs';
import {AuthResponseDto} from '../auth.interface';

const isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.accessToken;

  if (!token) return next(req);

  if (isRefreshing$.value) return refreshAndProceed(authService, req, next);

  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(err);
    }),
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);
    return authService.refreshAuthToken().pipe(
      switchMap((res: AuthResponseDto) => {
        return next(addToken(req, res.accessToken)).pipe(tap(() => isRefreshing$.next(false)));
      }),
    );
  }

  if (req.url.includes('refresh')) {
    return next(addToken(req, authService.refreshToken!));
  }

  return isRefreshing$.pipe(
    filter((isRefreshing: boolean) => !isRefreshing),
    switchMap(() => {
      return next(addToken(req, authService.accessToken!));
    }),
  );
};

const addToken = (req: HttpRequest<any>, token: string) =>
  req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
