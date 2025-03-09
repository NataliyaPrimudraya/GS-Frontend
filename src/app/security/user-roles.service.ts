import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private cookieService: CookieService) {
  }

  get userRoles() {
    return JSON.parse(this.cookieService.get("roles"));
  }
}
