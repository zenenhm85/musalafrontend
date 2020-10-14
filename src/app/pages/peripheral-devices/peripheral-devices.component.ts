import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { from, Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peripheral-devices',
  templateUrl: './peripheral-devices.component.html',
  styleUrls: ['./peripheral-devices.component.css'],
})
export class PeripheralDevicesComponent implements OnInit, OnDestroy {
  public user: User;
  public total: number;
  public searching: boolean = false;
  public updateModalVisible = false;
  public gateway:string;
  gatewaySub$: Subscription;

  public dataTable = {
    page: 0,
    size: 10,
  };
  devices: Device[] = [];
  device: Device = new Device();

  constructor(
    private userService: UserService,
    private deviceService: DeviceService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.gatewaySub$.unsubscribe();
  }


  ngOnInit(): void {
    this.user = this.userService.user;
    this.gatewaySub$ = this.getSubscription();    
    this.getDevices(this.gateway);
  }
  getSubscription() {
    return this.activeRoute.params.subscribe((params:Params)=>{
      this.gateway = params.gateway;
    });
  }
  getDevice(device: Device) {
    this.device = device;
    console.log(this.device);
  }

  getDevices(gateway: string) {
    this.deviceService.getDevices(gateway).subscribe(({ total, devices }) => {
      this.total = total;
      this.devices = devices;
    });
  }

  addDevice(e:boolean){
    if (e) {
      this.getDevices(this.gateway);
    }
  }
  deleDevice(e) {
    if (e) {
      this.getDevices(this.gateway);      
      Swal.fire('Success', 'Peripheral Device deleted successfully', 'success');     
    }
  }
  updateDevice(e){
    if (e) {
      this.getDevices(
        this.gateway
      );
    }
  }
}
