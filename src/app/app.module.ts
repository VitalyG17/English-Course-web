import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {TuiBadge, TuiBadgedContentComponent, TuiButtonSelect} from '@taiga-ui/kit';
import {
  TuiAlert,
  TuiButton,
  TuiDataListComponent,
  TuiFlagPipe,
  TuiOptGroup,
  TuiOption,
  TuiTextfieldDropdownDirective,
} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiBadgedContentComponent,
    TuiFlagPipe,
    TuiOptGroup,
    TuiDataListComponent,
    TuiButton,
    ReactiveFormsModule,
    TuiButtonSelect,
    TuiTextfieldDropdownDirective,
    TuiOption,
    TuiBadge,
    TuiAlert,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
