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
    ReservationCalendarComponent,
    MapOffresComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDialogModule,

    BrowserAnimationsModule, // Nécessaire pour les animations
    BrowserAnimationsModule, // Nécessaire pour les animations
    MatDatepickerModule, // Module de calendrier
    MatNativeDateModule, // Module de gestion des dates
    MatInputModule, // Module pour les champs de saisie
    MatFormFieldModule, // Module pour les formulaires
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,

    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
