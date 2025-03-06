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
import { ReclamationListComponent } from './Microservices/Reclamations/reclamation-list/reclamation-list.component';
import { ReclamationFormComponent } from './Microservices/Reclamations/reclamation-form/reclamation-form.component';
import { DemandeListComponent } from './Microservices/DemandesAssistances/demande-list/demande-list.component';
import { DemandeFormComponent } from './Microservices/DemandesAssistances/demande-form/demande-form.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    DashboardComponent,
    ReclamationListComponent,
    ReclamationFormComponent,
    DemandeFormComponent,
    DemandeListComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
