import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CanActivateFn, Router, UrlTree} from '@angular/router';

export const canActivateAuth: CanActivateFn = (): boolean | UrlTree => {
  return inject(AuthService).isAuth ? true : inject(Router).createUrlTree(['/auth']);
};
