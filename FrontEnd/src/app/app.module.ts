import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Ajouté pour ngClass, pipes (date, currency)
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts'; // Pour les histogrammes
import { AppRoutingModule } from './app-routing.module'; // Doit inclure les routes
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';
import { AssuranceListComponent } from './Microservices/Assurances/ComponentsAdmin/assurance-list/assurance-list.component';
import { AddassuranceComponent } from './Microservices/Assurances/ComponentsAdmin/addassurance/addassurance.component';
import { ContratFormComponent } from './Microservices/Assurances/ComponentsClient/contrat-form/contrat-form.component';
import { UserListComponent } from './Microservices/Assurances/user-list/user-list.component';
import { ListcontratclientComponent } from './Microservices/Assurances/ComponentsClient/listcontratclient/listcontratclient.component';
import { ListContratAdminComponent } from './Microservices/Assurances/ComponentsAdmin/list-contrat-admin/list-contrat-admin.component';
import { ListassuranceclientComponent } from './Microservices/Assurances/ComponentsClient/listassuranceclient/listassuranceclient.component';
import { FactureclientComponent } from './Microservices/Assurances/ComponentsClient/factureclient/factureclient.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FactureAdminComponent } from './Microservices/Assurances/ComponentsAdmin/facture-admin/facture-admin.component';
import * as FileSaver from 'file-saver';

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
    UserListComponent,
    FactureAdminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // Ajouté pour ngClass, pipes (date, currency)
    FormsModule, // Pour ngModel
    ReactiveFormsModule, // Pour les formulaires réactifs
    HttpClientModule, // Pour les requêtes HTTP
    NgChartsModule, // Pour les histogrammes
    AppRoutingModule,
    NgxPaginationModule ,
    

    
                  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }