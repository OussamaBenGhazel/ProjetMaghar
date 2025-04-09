import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Microservices/User/pages/login/login.component';
import { RegisterComponent } from './Microservices/User/pages/register/register.component';
import { ActivateAccountComponent } from './Microservices/User/pages/activate-account/activate-account.component';
import { HttpTokenInterceptor } from './services/User-Service/interceptor/http-token.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { authGuard } from './services/User-Service/guard/auth.guard';
import { CodeInputComponent } from './shared/code-input/code-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    CodeInputComponent // Keep the custom CodeInputComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule // Ensure FontAwesomeModule is in the imports array
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
