import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserCrudService } from '../../services/user-crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  public loading: boolean = true;
  public quantityShow: number = 10;
  public pages: number[] = [];
  public currentPage: number = 1;
  public total: number;
  public searching: boolean = false;

  public users: User[] = [];
  public user: User = new User(true,'','','','','','');
  public userLogin: User;

  constructor(
    private userCrudService: UserCrudService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.userService.user;
    this.getUsers(0, 10, true,1);
  }
  formPages(currentPage) {
    this.currentPage = currentPage;
    this.pages = [];

    let totalPages = Math.floor(this.total / this.quantityShow) + 1;

    if (this.total % this.quantityShow === 0) {
      totalPages = this.total / this.quantityShow;
    } 

    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }
  getUsers(start: number, limit: number, page: boolean,currentPage:number) {
    this.userCrudService
      .getUsers(start, limit)
      .subscribe(({ total, users }) => {
        this.loading = false;
        this.total = total;
        this.users = users;
        if (page) {
          this.formPages(currentPage);
        }
      });
  }

  changeQuantity() {
    this.getUsers(0, this.quantityShow, true,1);
  }
  

  getUser(user: User) {
    this.user = user;
  }

  changePreviousNext(value: number) {
    const change: boolean =
      this.currentPage + value <= this.pages.length &&
      this.currentPage + value >= 1;

    if (change) {
      this.currentPage += value;
      this.getUsers(
        this.quantityShow * (this.currentPage - 1),
        this.quantityShow,
        false,
        1
      );
    }
  }
  changePage(value: number) {
    this.currentPage = value;
    this.getUsers(
      this.quantityShow * (this.currentPage - 1),
      this.quantityShow,
      false,
      1
    );
  }
 

  deleteUser() {
    this.userCrudService.deleteUser(this.user.id).subscribe((resp) => {
      if (this.users.length == 1) {
        this.currentPage--;
        this.pages.pop();
      }      
      const start: number = this.quantityShow * (this.currentPage - 1);
      const limit: number = this.quantityShow;
      this.getUsers(start, limit, true,this.currentPage);
    });
  }
  searchUser(item: string) {
    if (item.length < 1) {
      this.searching = false;
      this.getUsers(0, this.quantityShow, true,1);
    } else {
      this.searching = true;
      this.userCrudService
        .searchUsers(item, this.quantityShow)
        .subscribe(({ total, users }) => {
          this.loading = false;
          this.total = total;
          this.users = users;
        });
    }
  }
}
