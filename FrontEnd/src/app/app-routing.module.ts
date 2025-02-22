import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';
import { AssuranceListComponent } from './Microservices/Assurances/assurance-list/assurance-list.component';
import { AddassuranceComponent } from './Microservices/Assurances/addassurance/addassurance.component';
import { ListassuranceclientComponent } from './Microservices/Assurances/listassuranceclient/listassuranceclient.component';
import { ContratFormComponent } from './Microservices/Assurances/contrat-form/contrat-form.component';
import { UserListComponent } from './Microservices/Assurances/user-list/user-list.component';
import { ListcontratclientComponent } from './Microservices/Assurances/listcontratclient/listcontratclient.component';
import { ListContratAdminComponent } from './Microservices/Assurances/list-contrat-admin/list-contrat-admin.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'partenaire-form', component: PartenaireFormComponent },
    { path: 'assurance-form', component: AddassuranceComponent },
    { path: 'listassurance', component: AssuranceListComponent },
    { path: 'listcontrat', component: ListContratAdminComponent },
    { path: 'assurance-form/:id', component: AddassuranceComponent },
    { path: '', component: AddassuranceComponent },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]},

  { path: 'packages', component:  UserListComponent},
  { path: 'confirmation', component:  ListcontratclientComponent},

  { path: 'contrat-form/:assuranceId', component: ContratFormComponent },
  { path: 'assurances', component: ListassuranceclientComponent },






];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
