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
import { StatsComponent } from './stats/stats.component';
import { AddassuranceComponent } from './Microservices/Assurances/ComponentsAdmin/addassurance/addassurance.component.spec';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'partenaire-form', component: PartenaireFormComponent },
      { path: 'partenaire-list', component: PartenaireListComponent },
      { path: 'partenaire-edit/:id', component: PartenaireEditComponent },
      { path: 'offre-partenaire-edit/:id', component: OffrePartenaireEditComponent },  // Assurez-vous que cette ligne existe

      { path: 'offre-partenaire-form', component: OffrePartenaireFormComponent },
       // Cette ligne est importante
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },






      { path: 'assurance-form', component: AddassuranceComponent },



    ]

  },
  { path: 'NosOffres', component: ListeOffreFrontComponent },
  { path: 'statistiques', component: StatsComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
