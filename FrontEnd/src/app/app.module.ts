import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';
import { PartenaireEditComponent } from './Microservices/Partenaires/partenaire-edit/partenaire-edit.component';
import { OffrePartenaireListComponent } from './Microservices/OffrePartenaire/offre-partenaire-list/offre-partenaire-list.component';
import { OffrePartenaireFormComponent } from './Microservices/OffrePartenaire/offre-partenaire-form/offre-partenaire-form.component';
import { OffrePartenaireEditComponent } from './Microservices/OffrePartenaire/offre-partenaire-edit/offre-partenaire-edit.component';
import { ListeOffreFrontComponent } from './Microservices/liste-offre-front/liste-offre-front.component';  // Importer FormsModule ici
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { AjouterOffreEmploiComponent } from './components/ajouter-offre-emploi/ajouter-offre-emploi.component';
import { ListOffresEmploiComponent } from './components/liste-offres-emploi/liste-offres-emploi.component';
import { NosOffresComponent } from './nos-offres/nos-offres.component';
import { PostulerComponent } from './postuler/postuler.component';
import { CandidatureListComponent } from './candidature-list/candidature-list.component';
import { AddRendezvousComponent } from './components/add-rendezvous/add-rendezvous.component';
import { CalendarRendezVousComponent } from './components/calendar-rendezvous/calendar-rendezvous.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListRendezVousComponent } from './components/list-rendezvous/list-rendezvous.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    DashboardComponent,
    PartenaireFormComponent,
    PartenaireListComponent,
    PartenaireEditComponent,
    OffrePartenaireListComponent,
    OffrePartenaireFormComponent,
    OffrePartenaireEditComponent,
    ListeOffreFrontComponent,
    AjouterOffreEmploiComponent,
    ListOffresEmploiComponent,
    NosOffresComponent,
    PostulerComponent,
    CandidatureListComponent,
    AddRendezvousComponent,
    CalendarRendezVousComponent,
    ListRendezVousComponent,
    OffreDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FullCalendarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
