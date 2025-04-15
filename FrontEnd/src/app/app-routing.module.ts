import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';
import { PartenaireEditComponent } from './Microservices/Partenaires/partenaire-edit/partenaire-edit.component';
import { OffrePartenaireFormComponent } from './Microservices/OffrePartenaire/offre-partenaire-form/offre-partenaire-form.component';
import { OffrePartenaireEditComponent } from './Microservices/OffrePartenaire/offre-partenaire-edit/offre-partenaire-edit.component';
import { ListeOffreFrontComponent } from './Microservices/liste-offre-front/liste-offre-front.component';
import { AjouterOffreEmploiComponent } from './components/ajouter-offre-emploi/ajouter-offre-emploi.component';
import { ListOffresEmploiComponent } from './components/liste-offres-emploi/liste-offres-emploi.component';
import { NosOffresComponent } from './nos-offres/nos-offres.component';
import { PostulerComponent } from './postuler/postuler.component';
import { CandidatureListComponent } from './candidature-list/candidature-list.component';
import { AddRendezvousComponent } from './components/add-rendezvous/add-rendezvous.component';
import { CalendarRendezVousComponent } from './components/calendar-rendezvous/calendar-rendezvous.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'partenaire-form', component: PartenaireFormComponent },
      { path: 'partenaire-list', component: PartenaireListComponent },
      { path: 'partenaire-edit/:id', component: PartenaireEditComponent },
      { path: 'offre-partenaire-edit/:id', component: OffrePartenaireEditComponent },
      { path: 'recrutement', component: AjouterOffreEmploiComponent },
      { path: 'liste-offres-emploi', component: ListOffresEmploiComponent },
      { path: 'candidatures', component: CandidatureListComponent },
      { path: 'calendar-rendezvous', component: CalendarRendezVousComponent },
      { path: 'offre-partenaire-form', component: OffrePartenaireFormComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'nos-offres', component: NosOffresComponent },
  { path: 'postuler/:id', component: PostulerComponent },
  { path: 'prendre-rendezvous', component: AddRendezvousComponent },
  { path: 'offre-detail/:id', component: OffreDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }