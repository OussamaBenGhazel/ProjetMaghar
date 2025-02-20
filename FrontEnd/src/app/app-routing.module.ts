import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';
import { AssuranceListComponent } from './Microservices/Assurances/assurance-list/assurance-list.component';
import { AddassuranceComponent } from './Microservices/Assurances/addassurance/addassurance.component';
import { ListassuranceclientComponent } from './Microservices/Assurances/listassuranceclient/listassuranceclient.component';
import { CreateContratComponent } from './Microservices/Assurances/create-contrat/create-contrat.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'partenaire-form', component: PartenaireFormComponent },
    { path: 'assurance-form', component: AddassuranceComponent },
    { path: 'listassurance', component: AssuranceListComponent },
    { path: 'assurance-form/:id', component: AddassuranceComponent },
    { path: '', component: AddassuranceComponent },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]},

  { path: 'packages', component: PartenaireListComponent },
  
 
  { path: 'contrat-form/:id', component: CreateContratComponent },  // Modification ici
  { path: 'assurances', component: ListassuranceclientComponent },





];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
