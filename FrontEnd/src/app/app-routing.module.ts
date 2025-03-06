import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import only the relevant components
import { ReclamationFormComponent } from './Microservices/Reclamations/reclamation-form/reclamation-form.component';
import { ReclamationListComponent } from './Microservices/Reclamations/reclamation-list/reclamation-list.component';
import { DemandeListComponent } from './Microservices/DemandesAssistances/demande-list/demande-list.component';
import { DemandeFormComponent } from './Microservices/DemandesAssistances/demande-form/demande-form.component';


const routes: Routes = [
  // Add routes for Reclamation-related components
  { path: 'reclamations', component: ReclamationListComponent },
  { path: 'reclamations/form', component: ReclamationFormComponent },
  { path: 'reclamations/create', component: ReclamationFormComponent },
  { path: 'reclamations/edit/:id', component: ReclamationFormComponent },
  { path: 'demandes-assistance', component: DemandeListComponent },
  { path: 'demandes-assistance/form', component: DemandeFormComponent },
  { path: 'demandes-assistance/create', component: DemandeFormComponent },
  { path: 'demandes-assistance/edit/:id', component: DemandeFormComponent },
  { path: '', redirectTo: '/reclamations', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
