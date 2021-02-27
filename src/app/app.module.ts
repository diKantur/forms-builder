import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormCheckingComponent } from './form-checking/form-checking.component';
import { FormSettingsComponent } from './form-settings/form-settings.component';

import { Effects } from './core/store/core.effects';
import { reducers } from './core/store';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';

import { MatModule } from './shared/mat.module';
import { InputComponent } from './components/input/input.component';
import { TextPipe } from './shared/text.pipe';
import { AbstractCVAComponent } from './shared/abstract.cva.component';
import { AbstractInputComponent } from './shared/abstract.input.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormCheckingComponent,
    FormSettingsComponent,
    InputComponent,
    TextPipe,
    AbstractCVAComponent,
    AbstractInputComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([Effects]),
    FormsModule,
    HttpClientModule,
    ReactiveComponentModule,
    RouterModule.forRoot(routes),
    MatModule,
  ],
  providers: [AuthGuard, AuthService, AuthInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
