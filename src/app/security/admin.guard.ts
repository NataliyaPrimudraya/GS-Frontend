import {inject} from '@angular/core';
import {UserRolesService} from './user-roles.service';
import {Router} from '@angular/router';

export const canActivateAdmin = () => {
  const userRoles = inject(UserRolesService).userRoles

  if (!userRoles) {
    return inject(Router).createUrlTree(['/welcome.jhtml']);
  } else {
    if (userRoles.find(role => role == 'ADMIN')) {
      return true;
    }
  }
  return inject(Router).createUrlTree(['/welcome.jhtml']);
}
