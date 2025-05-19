import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const resultGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  if (!router.getCurrentNavigation()?.extras.state?.['totalTasks']) {
    return router.createUrlTree(['/courses']);
  }
  return true;
};
