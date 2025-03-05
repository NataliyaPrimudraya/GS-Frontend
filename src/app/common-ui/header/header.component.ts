import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HasRoleDirective} from '../../security/has-role.directive';
import {CookieService} from 'ngx-cookie-service';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {TranslocoDirective} from '@jsverse/transloco';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    HasRoleDirective,
    LanguageSwitcherComponent,
    TranslocoDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  login: string | null = null;

  constructor(private cookieService: CookieService) {
    this.login = this.cookieService.get('login');
  }
}
