import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserCrudService } from '../../services/user-crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  public total: number;
  public searching: boolean = false;
  public dataTable = {
    page: 0,
    size: 10,
  };

  public users: User[] = [];
  public user: User = new User(true, '', '', '', '', '', '');
  public userLogin: User;

  constructor(
    private userCrudService: UserCrudService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.userService.user;

    this.getUsers(this.dataTable.page, this.dataTable.size);
  }

  getUsers(start, limit) {
    this.userCrudService
      .getUsers(start, limit)
      .subscribe(({ total, users }) => {
        this.total = total;
        this.users = users;
      });
  }

  getUser(user: User) {
    this.user = user;
  }

  deleteUser() {
    this.userCrudService.deleteUser(this.user.id).subscribe((resp) => {
      if (this.users.length === 1) {
        this.dataTable.page--;
      }
      this.getUsers(
        this.dataTable.size * this.dataTable.page,
        this.dataTable.size
      );
    });
  }
  searchUser(item: string) {
    if (item.length < 1) {
      this.searching = false;
      this.getUsers(
        this.dataTable.size * this.dataTable.page,
        this.dataTable.size
      );
    } else {
      this.searching = true;
      this.userCrudService
        .searchUsers(item, this.dataTable.size)
        .subscribe(({ users }) => {
          this.users = users;
        });
    }
  }
  async pageEvent(e: PageEvent) {
    const start = e.pageSize * e.pageIndex;
    const limit = e.pageSize;
    this.dataTable.size = e.pageSize;
    this.dataTable.page = e.pageIndex;

    this.userCrudService
      .getUsers(start, limit)
      .subscribe(({ total, users }) => {
        this.users = users;
      });
  }
}
