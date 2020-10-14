import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RightmodaluserComponent } from './rightmodaluser/rightmodaluser.component';
import { DeleteGatewayComponent } from './delete-gateway/delete-gateway.component';
import { AddGatewayComponent } from './add-gateway/add-gateway.component';
import { EditGatewayComponent } from './edit-gateway/edit-gateway.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DelteDeviceComponent } from './delte-device/delte-device.component'


@NgModule({
  declarations: [
    RightmodaluserComponent,
    DeleteGatewayComponent,
    AddGatewayComponent,
    EditGatewayComponent,
    AddDeviceComponent,   
    DelteDeviceComponent  
    
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    RightmodaluserComponent,
    DeleteGatewayComponent,
    AddGatewayComponent,
    EditGatewayComponent,
    AddDeviceComponent,    
    DelteDeviceComponent
  ],
})
export class ComponentsModule {}
