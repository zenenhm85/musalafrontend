import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RightmodaluserComponent } from './rightmodaluser/rightmodaluser.component';





@NgModule({
  declarations: [RightmodaluserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RightmodaluserComponent   
  ]
})
export class ComponentsModule { }
