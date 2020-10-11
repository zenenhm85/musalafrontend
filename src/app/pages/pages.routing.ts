import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from '../pages/pages.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'account-setting',
        component: AccountSettingComponent,
        data: { title: 'Themes' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'User Profile' },
      },
      { path: 'users', component: UsersComponent, canActivate:[AdminGuard], data: { title: 'Users' } },     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
