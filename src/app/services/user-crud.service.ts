import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { GetUsers } from '../interfaces/get-users.interface';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UserCrudService {
  constructor(private http: HttpClient) {}

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

  getUsers(start: number = 0, limit: number = 10) {
    const route = `${url}/users?start=${start}&limit=${limit}`;

    return this.http.get<GetUsers>(route, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map((user) => {
          return new User(
            user.active,
            user.name,
            user.email,
            '',
            user.img,
            user.id,
            user.role
          );
        });

        return {
          total: resp.total,
          users,
        };
      })
    );
  }
  deleteUser(id: string) {
    const route = `${url}/users/${id}`;
    return this.http.delete(route, this.headers);
  }
  searchUsers(search: string, limit: number) {
    const route = `${url}/search/users/${search}?limit=${limit}`;

    return this.http.get<GetUsers>(route, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map((user) => {
          return new User(
            user.active,
            user.name,
            user.email,
            '',
            user.img,
            user.id,
            user.role
          );
        });

        return {
          total: resp.total,
          users,
        };
      })
    );
  }
  updateRoleAndActive(user: User) {

    return this.http.put(`${url}/users/${user.id}`, user, this.headers);
    
  }
}
