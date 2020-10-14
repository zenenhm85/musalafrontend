import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Gateway } from '../models/gateway';
import { GetGateways } from '../interfaces/get-gateway.interface';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
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

  getGateways(start: number = 0, limit: number = 10) {
    const route = `${url}/gateways?start=${start}&limit=${limit}`;

    return this.http.get<GetGateways>(route, this.headers).pipe(
      map((resp) => {
        const gateways = resp.gateways.map((gateway) => {
          return new Gateway(
            gateway.id,
            gateway.name,
            gateway.serial,
            gateway.ipv4
          );
        });
        return {
          total: resp.total,
          gateways,
        };
      })
    );
  }
  searchGateways(search: string, limit: number) {
    const route = `${url}/search/gateways/${search}?limit=${limit}`;

    return this.http.get<GetGateways>(route, this.headers).pipe(
      map((resp) => {
        const gateways = resp.gateways.map((gateway) => {
          return new Gateway(
            gateway.id,
            gateway.name,
            gateway.serial,
            gateway.ipv4
          );
        });
        return {
          total: resp.total,
          gateways,
        };
      })
    );
  }

  deleteGateway(id: string) {
    const route = `${url}/gateways/${id}`;
    return this.http.delete(route, this.headers);
  }
  createGateway(formData: Gateway) {
    return this.http.post(`${url}/gateways`, formData, this.headers);
  }
  updateGateway(formData: Gateway, id:string) {
    return this.http.put(`${url}/gateways/${id}`, formData, this.headers);
  }

}
