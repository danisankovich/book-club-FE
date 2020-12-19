import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PollDashboardComponent } from './components/poll-dashboard/poll-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'poll', component: PollDashboardComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
