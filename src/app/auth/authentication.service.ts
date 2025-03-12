import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationResponse} from './authentication.interface';
import {catchError, firstValueFrom, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {RefreshTokenResponse} from './token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string | null = null;
  refreshToken: string | null = null;
  baseApiUrl: string = "http://localhost:8080/webdispatch/api/auth";

  constructor(private router: Router,
              private http: HttpClient,
              private cookieService: CookieService) {
  }

  get isAuthenticated(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refresh_token');
    }
    return !!this.token;
  }

  async login(payload: { login: string, password: string }) {
    await firstValueFrom(this.http.post<AuthenticationResponse>(`${this.baseApiUrl}/authenticate`, payload))
      .then(response => this.saveAuthData(response)
    )
    return this.isAuthenticated;
  }

  refreshAuthToken() {
    return this.http.post<RefreshTokenResponse>(`${this.baseApiUrl}/refresh-token`, {refreshToken: this.refreshToken})
      .pipe(
        tap(response => {
          this.token = response.accessToken;
          this.cookieService.set("token", response.accessToken);
        }),
        catchError((error) => {
          this.logout()
          return throwError(error);
        })
      )
  }

  saveAuthData(response: AuthenticationResponse) {
    this.token = response.accessToken;
    this.refreshToken = response.refreshToken;

    this.cookieService.set("login", response.login);
    this.cookieService.set("roles", JSON.stringify(response.roles));
    this.cookieService.set("token", response.accessToken);
    this.cookieService.set("refresh_token", response.refreshToken);
  }

  logout(): void {
    this.token = null;
    this.refreshToken = null;

    this.cookieService.delete("login")
    this.cookieService.delete("roles");
    this.cookieService.delete("token");
    this.cookieService.delete("refresh_token");

    this.router.navigate(['/login.jhtml'], {queryParams: {logout: ''}});
  }
}
