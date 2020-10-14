import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Device } from '../models/device';
import { GetDevices } from '../interfaces/get-devices.interface';
import { map } from 'rxjs/operators';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getDevices(gateway: string) {
    const route = `${url}/devices/${gateway}`;

    return this.http.get<GetDevices>(route, this.headers).pipe(
      map((resp) => {
        const devices = resp.devices.map((device) => {
          return new Device(
            device.id,
            device.uid,
            device.vendor,
            device.status,
            device.date,
            device.gateway
          );
        });
        return {
          total: resp.total,
          devices,
        };
      })
    );
  }
  createDevice(formData: Device) {
    return this.http.post(`${url}/devices`, formData, this.headers);
  }
  deleteDevice(id: string) {
    const route = `${url}/devices/${id}`;
    return this.http.delete(route, this.headers);
  }
}
