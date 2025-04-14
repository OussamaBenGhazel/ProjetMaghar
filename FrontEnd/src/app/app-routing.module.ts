import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationFormComponent } from './admin/Reclamations/reclamation-form/reclamation-form.component';
import { ReclamationListComponent } from './admin/Reclamations/reclamation-list/reclamation-list.component';
import { DemandeListComponent } from './admin/DemandesAssistances/demande-list/demande-list.component';
import { DemandeFormComponent } from './admin/DemandesAssistances/demande-form/demande-form.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ReclamationsFormsComponentComponent } from './microservices/Reclamations/reclamations-forms-component/reclamations-forms-component.component';
import { ReclamationConfirmationComponent } from './microservices/Reclamations/reclamation-confirmation/reclamation-confirmation.component';

const routes: Routes = [
  // Admin routes
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'reclamations', component: ReclamationListComponent },
      { path: 'reclamations/create', component: ReclamationFormComponent },
      { path: 'reclamations/edit/:id', component: ReclamationFormComponent },
      { path: 'demandes-assistance', component: DemandeListComponent },
      { path: 'demandes-assistance/create', component: DemandeFormComponent },
      { path: 'demandes-assistance/edit/:id', component: DemandeFormComponent },
      { path: '', redirectTo: 'reclamations', pathMatch: 'full' }
    ]
  },
  // User routes (non-admin)
  {
    path: 'reclamations',
    component: ReclamationsFormsComponentComponent
  },
  // Default redirect for non-admins or when accessing the root
  { 
    path: '', redirectTo: '/home', pathMatch: 'full' 
  },
  // Ensure that the route for the confirmation page is also included
  {
    path: 'reclamation-confirmation',
    component: ReclamationConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
