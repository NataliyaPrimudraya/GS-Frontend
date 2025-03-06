import {Component, OnInit, signal} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {AuthenticationService} from '../../auth/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslocoDirective} from '@jsverse/transloco';
import {LanguageSwitcherComponent} from '../../common-ui/language-switcher/language-switcher.component';

@Component({
  selector: 'app-login-page',
  imports: [
    FloatLabel,
    FormsModule,
    Button,
    InputText,
    ReactiveFormsModule,
    TranslocoDirective,
    LanguageSwitcherComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    login: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })
  isErrorOccurred = signal<boolean>(false);
  isLogoutOccurred = signal<boolean>(false);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('logout') != null) {
      this.isLogoutOccurred = signal<boolean>(true);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.authService.login(this.form.value)) {
        this.router.navigate(['/welcome.jhtml']);
      }
    } else {
      this.isErrorOccurred.set(true);
    }
  }
}
