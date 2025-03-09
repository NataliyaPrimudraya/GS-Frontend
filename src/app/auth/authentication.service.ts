import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationResponse} from './authentication.interface';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseApiUrl: string = "http://localhost:8080/webdispatch/api/auth";

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  get isAuthenticated(): boolean {
    return this.cookieService.get("user") !== '';
  }

  async login(payload: { login: string, password: string }) {
    let response: AuthenticationResponse = await firstValueFrom(this.http.post<AuthenticationResponse>(`${this.baseApiUrl}/authenticate`, payload))
    this.cookieService.set("user", String(response.id));
    this.cookieService.set("login", response.login);
    this.cookieService.set("roles", JSON.stringify(response.roles));
    return this.isAuthenticated;
  }

  logout(): void {
    this.cookieService.deleteAll()
  }
}
