import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TuiAvatar, TuiBadgedContentComponent, TuiButtonSelect} from '@taiga-ui/kit';
import {TuiAppearance, TuiFallbackSrcPipe, TuiRoot} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarMenuComponent} from './sidebar-menu/sidebar-menu.component';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {ProfileHeaderComponent} from './profile/profile-header/profile-header.component';
import {ProfilePageComponent} from './profile/profile-page/profile-page.component';
import {CoursesListComponent} from './profile/courses-list/courses-list.component';
import {AuthService} from './sign-in-up/shared/services/auth.service';
import {authInterceptor} from './sign-in-up/shared/interceptors/auth.interceptor';
import {UserStatsComponent} from './profile/user-stats/user-stats.component';
import {ProgressTrainingDaysComponent} from './profile/progress-training-days/progress-training-days.component';
import {LanguageProgressComponent} from './profile/language-progress/language-progress.component';
import {TuiCardLarge} from '@taiga-ui/layout';
import {ProfileService} from './profile/shared/services/profile.service';
import {SnackBarService} from '../shared/services/snack-bar.service';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiBadgedContentComponent,
    ReactiveFormsModule,
    TuiButtonSelect,
    BrowserAnimationsModule,
    TuiRoot,
    SidebarMenuComponent,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TuiAvatar,
    ProfilePageComponent,
    TuiFallbackSrcPipe,
    CoursesListComponent,
    LanguageProgressComponent,
    TuiAppearance,
    TuiCardLarge,
    UserStatsComponent,
    ProgressTrainingDaysComponent,
    ProfileHeaderComponent,
  ],
  providers: [AuthService, ProfileService, SnackBarService, provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
