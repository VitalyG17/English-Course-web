import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './profile/profile-page/profile-page.component';
import {LayoutComponent} from './layout/layout.component';
import {ErrorComponentComponent} from './error-component/error-component.component';
import {SignInUpComponent} from './sign-in-up/sign-in-up.component';
//import {canActivateAuth} from './sign-in-up/shared/guards/access.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
    //canActivate: [canActivateAuth],
  },
  {
    path: 'auth',
    component: SignInUpComponent,
  },
  {
    path: '**',
    component: ErrorComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
