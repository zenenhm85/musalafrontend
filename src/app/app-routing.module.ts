import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing'; 
import {AuthRoutingModule} from './auth/auth.routing';


import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';



const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundpageComponent }
  
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
