import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LanguageSwitcherComponent} from '../../common-ui/language-switcher/language-switcher.component';
import {TranslocoDirective} from '@jsverse/transloco';
import {AuthenticationService} from '../../auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout-page',
  imports: [
    Button,
    FormsModule,
    LanguageSwitcherComponent,
    ReactiveFormsModule,
    TranslocoDirective
  ],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.css'
})
export class LogoutPageComponent {

  constructor(private router: Router,
              private authService : AuthenticationService) {
  }

  onSubmit() {
    this.authService.logout();
    this.router.navigate(['/login.jhtml'], {queryParams: {logout: ''}});
  }
}
