import {inject} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

export const canActivateAuth = () => {
  const isAuthenticated = inject(AuthenticationService).isAuthenticated;

  if (isAuthenticated) {
    return true;
  }

  let currentUrl: any;
  inject(ActivatedRoute).url.subscribe(url => {
    currentUrl = url[0].path
  });
  if (currentUrl !== 'login.jhtml') {
    return inject(Router).createUrlTree(['/login.jhtml']);
  }

  return false;
}
