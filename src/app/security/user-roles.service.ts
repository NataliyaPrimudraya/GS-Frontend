import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../data/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private cookieService: CookieService,
              private userService: UserService) {
  }

  get userRoles() {
    let id = this.cookieService.get('user') as unknown as number;
    let user = this.userService.getUserById(id);
    return user ? user.roles : null;
  }
}
