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
import { AssuranceListComponent } from './Microservices/Assurances/ComponentsAdmin/assurance-list/assurance-list.component';
import { AddassuranceComponent } from './Microservices/Assurances/ComponentsAdmin/addassurance/addassurance.component';
import { ContratFormComponent } from './Microservices/Assurances/ComponentsClient/contrat-form/contrat-form.component';
import { UserListComponent } from './Microservices/Assurances/user-list/user-list.component';
import { ListcontratclientComponent } from './Microservices/Assurances/ComponentsClient/listcontratclient/listcontratclient.component';
import { ListContratAdminComponent } from './Microservices/Assurances/ComponentsAdmin/list-contrat-admin/list-contrat-admin.component';
import { ListassuranceclientComponent } from './Microservices/Assurances/ComponentsClient/listassuranceclient/listassuranceclient.component';
import { FactureclientComponent } from './Microservices/Assurances/ComponentsClient/factureclient/factureclient.component';

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
    ListContratAdminComponent,
    FactureclientComponent,
    
  
    
    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
     // Add ReactiveFormsModule to imports

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }