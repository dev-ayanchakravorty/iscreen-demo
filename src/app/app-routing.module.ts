import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'notifications', component: NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
