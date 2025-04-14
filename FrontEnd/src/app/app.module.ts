import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ReclamationListComponent } from './admin/Reclamations/reclamation-list/reclamation-list.component';
import { ReclamationFormComponent } from './admin/Reclamations/reclamation-form/reclamation-form.component';
import { DemandeListComponent } from './admin/DemandesAssistances/demande-list/demande-list.component';
import { DemandeFormComponent } from './admin/DemandesAssistances/demande-form/demande-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from "ng-recaptcha";
import { ReclamationsFormsComponentComponent } from './microservices/Reclamations/reclamations-forms-component/reclamations-forms-component.component';
import { ReclamationConfirmationComponent } from './microservices/Reclamations/reclamation-confirmation/reclamation-confirmation.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    DashboardComponent,
    ReclamationFormComponent,
    ReclamationListComponent,
    DemandeFormComponent,
    DemandeListComponent,
    ReclamationsFormsComponentComponent,
    ReclamationConfirmationComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RecaptchaModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
