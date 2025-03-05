import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserRolesService} from './user-roles.service';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  @Input() hasRole: string[] | string | undefined;

  constructor(private _viewContainer: ViewContainerRef,
              private _template: TemplateRef<any>,
              private userRolesService: UserRolesService) {
  }

  ngOnInit(): void {
    this._checkRoles(this.userRolesService.userRoles);
  }

  private _checkRoles(userRoles: string[] | null): void {
    if (!userRoles) {
      this._viewContainer.clear();
    } else {
      if (!this.hasRole || this.hasRole === 'undefined') {
        this._viewContainer.createEmbeddedView(this._template);
      } else {
        let index = -1
        for (const role of userRoles) {
          if (this.hasRole.indexOf(role) !== index) {
            index = this.hasRole.indexOf(role)
          }
        }
        if (index == -1) {
          this._viewContainer.clear();
        } else {
          this._viewContainer.createEmbeddedView(this._template);
        }
      }
    }
  }
}
