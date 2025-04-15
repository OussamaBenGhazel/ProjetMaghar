import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PartenaireFormComponent } from './Microservices/Partenaires/partenaire-form/partenaire-form.component';
import { PartenaireListComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';
import { LoginComponent } from './Microservices/Partenaires/partenaire-list/partenaire-list.component';

const routes: Routes = [
  {path: 'login', component: 'LoginComponent'},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'partenaire-form', component: PartenaireFormComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]},

  { path: 'packages', component: PartenaireListComponent },




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
