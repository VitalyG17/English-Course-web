import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TuiAvatar, TuiBadgedContentComponent, TuiButtonSelect} from '@taiga-ui/kit';
import {TuiFallbackSrcPipe, TuiRoot} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarMenuComponent} from './sidebar-menu/sidebar-menu.component';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {AuthService} from './sign-in-up/shared/services/auth.service';
import {authInterceptor} from './sign-in-up/shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, ProfilePageComponent, LayoutComponent],
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
    TuiFallbackSrcPipe,
  ],
  providers: [AuthService, provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
