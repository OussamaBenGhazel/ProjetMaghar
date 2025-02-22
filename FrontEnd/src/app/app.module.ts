import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';  // Importer FormsModule ici
import { AssuranceListComponent } from './Microservices/Assurances/assurance-list/assurance-list.component';
import { AddassuranceComponent } from './Microservices/Assurances/addassurance/addassurance.component';
import { ContratFormComponent } from './Microservices/Assurances/contrat-form/contrat-form.component';
import { UserListComponent } from './Microservices/Assurances/user-list/user-list.component';
import { ListcontratclientComponent } from './Microservices/Assurances/listcontratclient/listcontratclient.component';
import { ListContratAdminComponent } from './Microservices/Assurances/list-contrat-admin/list-contrat-admin.component';
import { ListassuranceclientComponent } from './Microservices/Assurances/listassuranceclient/listassuranceclient.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    DashboardComponent,
    PartenaireFormComponent,
    PartenaireListComponent,
    AssuranceListComponent,
    AddassuranceComponent,
    ListassuranceclientComponent,
    ContratFormComponent,
    ListcontratclientComponent,
    ListContratAdminComponent
  
    
    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, // Add ReactiveFormsModule to imports

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }