import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { GatewayService } from '../../services/gateway.service';
import { Gateway } from '../../models/gateway';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public total: number;
  public searching: boolean = false;
  public user: User;
  public updateModalVisible = false;

  public dataTable = {
    page: 0,
    size: 10,
  };

  public gateways: Gateway[] = [];
  public gateway: Gateway = new Gateway();

  constructor(
    private gatewayService: GatewayService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;

    this.getGateways(this.dataTable.page, this.dataTable.size);
  }

  getGateways(start, limit) {
    this.gatewayService
      .getGateways(start, limit)
      .subscribe(({ total, gateways }) => {
        this.total = total;
        this.gateways = gateways;
      });
  }
  searchGateways(item: string) {
    if (item.length < 1) {
      this.searching = false;
      this.getGateways(
        this.dataTable.size * this.dataTable.page,
        this.dataTable.size
      );
    } else {
      this.searching = true;
      this.gatewayService
        .searchGateways(item, this.dataTable.size)
        .subscribe(({ gateways }) => {
          this.gateways = gateways;
        });
    }
  }
  getGateway(gateway: Gateway, type:number) {    
    this.gateway = gateway;    
  }
  pageEvent(e: PageEvent) {
    const start = e.pageSize * e.pageIndex;
    const limit = e.pageSize;
    this.dataTable.size = e.pageSize;
    this.dataTable.page = e.pageIndex;

    this.gatewayService
      .getGateways(start, limit)
      .subscribe(({ total, gateways }) => {
        this.gateways = gateways;
      });
  }
  deleGateway(e) {
    if (e) {
      if (this.gateways.length === 1) {
        this.dataTable.page--;
      }
      Swal.fire('Success', 'Gateway deleted successfully', 'success');
      this.getGateways(
        this.dataTable.size * this.dataTable.page,
        this.dataTable.size
      );
    }
  }
  addGateway(e: boolean) {
    if (e) {
      this.getGateways(
        this.dataTable.size * this.dataTable.page,
        this.dataTable.size
      );
    }
  }
  updateGateway(e: boolean) {
    if (e) {
      this.getGateways(
        this.dataTable.size * this.dataTable.page,
        this.dataTable.size
      );
    }
  }
}
