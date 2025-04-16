import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TuiBadgedContentComponent, TuiButtonSelect} from '@taiga-ui/kit';
import {TuiRoot} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarMenuComponent} from './sidebar-menu/sidebar-menu.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
