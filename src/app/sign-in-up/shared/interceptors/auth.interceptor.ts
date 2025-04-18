import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {BehaviorSubject, catchError, filter, switchMap, tap, throwError} from 'rxjs';
import {AuthResponseDto} from '../auth.interface';

const isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.accessToken;

  if (!token) return next(req);

  if (isRefreshing$.value) return refreshAndProceed(authService, req, next);

  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(err);
    }),
  );
};

const refreshAndProceed = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      switchMap((res: AuthResponseDto) => {
        return next(addToken(req, res.accessToken)).pipe(tap(() => isRefreshing$.next(false)));
      }),
    );
  }

  if (req.url.includes('refresh')) return next(addToken(req, authService.accessToken!));

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
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
