import {Component} from '@angular/core';
import {FooterComponent} from '../../common-ui/footer/footer.component';
import {HeaderComponent} from '../../common-ui/header/header.component';
import {TranslocoDirective} from '@jsverse/transloco';

@Component({
  selector: 'app-welcome-page',
  imports: [
    FooterComponent,
    HeaderComponent,
    TranslocoDirective,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
}
