import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ComponentsModule } from '../components/components.module'
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesComponent} from './pages.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PeripheralDevicesComponent } from './peripheral-devices/peripheral-devices.component';




@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsersComponent,   
    ProfileComponent,
    AccountSettingComponent,
    PeripheralDevicesComponent      
  ],
  exports:[
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule, 
    ComponentsModule,
    MatPaginatorModule
     
  ]
})
export class PagesModule { }
