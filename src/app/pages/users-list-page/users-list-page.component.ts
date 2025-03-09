import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {FooterComponent} from '../../common-ui/footer/footer.component';
import {HeaderComponent} from '../../common-ui/header/header.component';
import {UserService} from '../../data/services/user.service';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {User} from '../../data/interfaces/user.interface';
import {TranslocoDirective} from '@jsverse/transloco';

@Component({
  selector: 'app-users-list-page',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink,
    ButtonDirective,
    DatePipe,
    TranslocoDirective
  ],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.css'
})
export class UsersListPageComponent {
  users: User[] = []

  constructor(private userService: UserService) {
    this.userService.getAllUsers().then((users: User[]) => {
        this.users = users;
      }
    )
  }

}
