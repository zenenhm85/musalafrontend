import { environment } from '../../environments/environment';

const url = environment.url;

export class User {
  constructor(
    public active: boolean,
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public id?: string,
    public role?: string
  ) {}

  get imageUrl() {
    if (this.img) {
      return `${url}/users/img/${this.img}`;
    }
    return `${url}/users/img/not-user.png`;
  }
}
