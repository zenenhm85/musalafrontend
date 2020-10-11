import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
 
  public total: number = 0;
  public user: User = this.userService.user;

  constructor(
    private userService: UserService,
   
  ) {}

  ngOnInit(): void {    
    
  } 
}
 