import {Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {UsersListPageComponent} from './pages/users-list-page/users-list-page.component';
import {LoginEditPageComponent} from './pages/login-edit-page/login-edit-page.component';
import {canActivateAuth} from './auth/access.guard';
import {canActivateAdmin} from './security/admin.guard';

export const routes: Routes = [
  {path: 'login.jhtml', component: LoginPageComponent},
  {
    path: '', children: [
      {path: '',  redirectTo: 'login.jhtml', pathMatch: 'full' },
      {path: 'welcome.jhtml', component: WelcomePageComponent},
      {path: 'userslist.jhtml', component: UsersListPageComponent, canActivate: [canActivateAdmin]},
      {path: 'loginedit.jhtml', component: LoginEditPageComponent, canActivate: [canActivateAdmin]},
      {path: '**',  redirectTo: 'welcome.jhtml'},
    ],
    canActivate: [canActivateAuth]
  },
  {path: '**',  redirectTo: 'login.jhtml'},
];
