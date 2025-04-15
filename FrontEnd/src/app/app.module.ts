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
<<<<<<< HEAD
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
=======
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Nécessaire pour les animations
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MapOffresComponent } from './map-offres/map-offres.component';
import { StatsComponent } from './stats/stats.component';
import { NgChartsModule } from 'ng2-charts';
import { Assurance } from './core/models/assurance.model';
import { AddassuranceComponent } from './Microservices/Assurances/ComponentsAdmin/addassurance/addassurance.component.spec';


>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8

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
<<<<<<< HEAD
    AjouterOffreEmploiComponent,
    ListOffresEmploiComponent,
    NosOffresComponent,
    PostulerComponent,
    CandidatureListComponent,
    AddRendezvousComponent,
    CalendarRendezVousComponent,
    ListRendezVousComponent,
    OffreDetailComponent,
=======
    ReservationCalendarComponent,
    MapOffresComponent,
    AddassuranceComponent,
    StatsComponent,
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
<<<<<<< HEAD
    FullCalendarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
=======
    ReactiveFormsModule,
    MatDialogModule,


    BrowserAnimationsModule, // Nécessaire pour les animations
    MatDatepickerModule, // Module de calendrier
    MatNativeDateModule, // Module de gestion des dates
    MatInputModule, // Module pour les champs de saisie
    MatFormFieldModule,

    // Module pour les formulaires
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,

    }),
    NgChartsModule

>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
