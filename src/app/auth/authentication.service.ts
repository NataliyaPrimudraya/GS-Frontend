import {Injectable} from '@angular/core';
import {UserService} from '../data/services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserService,
              private cookieService: CookieService) {
  }

  get isAuthenticated(): boolean {
    return this.cookieService.get("user") !== '';
  }

  login(payload: { login: string, password: string }) {
    const user = this.userService.getUserByLoginAndPassword(payload.login, payload.password);
    if (user) {
      this.cookieService.set("user", String(user.id));
      this.cookieService.set("login", payload.login);
      return true;
    }
    return false;
  }

  logout(): void {
    this.cookieService.delete("user");
    this.cookieService.delete("login");
  }
}
