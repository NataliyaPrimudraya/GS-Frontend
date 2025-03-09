import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {FooterComponent} from '../../common-ui/footer/footer.component';
import {HeaderComponent} from '../../common-ui/header/header.component';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Checkbox} from 'primeng/checkbox';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../data/services/user.service';
import {User} from '../../data/interfaces/user.interface';
import {formatDate} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {TranslocoDirective} from '@jsverse/transloco';

@Component({
  selector: 'app-login-edit-page',
  imports: [
    Button,
    FooterComponent,
    HeaderComponent,
    InputText,
    FormsModule,
    ReactiveFormsModule,
    Checkbox,
    InputNumber,
    TranslocoDirective,
  ],
  templateUrl: './login-edit-page.component.html',
  styleUrl: './login-edit-page.component.css'
})
export class LoginEditPageComponent implements OnInit {
  id: number | null = null;
  user: User | null = null;
  roles: string[] = ['ADMIN', 'USER', 'MODERATOR', 'EDITOR', 'MANAGER'];
  form: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') as unknown as number;
    if (this.route.snapshot.queryParamMap.get('delete') != null) {
      this.userService.deleteUser(this.id);
      this.router.navigate(['/userslist.jhtml']);
    }
    this.form = this.fb.group({
      id: [null],
      login: [null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      }],
      password: [null, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
        updateOn: "blur"
      }],
      name: [null, {validators: Validators.required, updateOn: "blur"}],
      age: [null, {validators: [Validators.required, Validators.min(19)], updateOn: "blur"}],
      birthdate: [null],
      salary: [null, {validators: [Validators.required, Validators.min(726)], updateOn: "blur"}],
      roles: [null, {validators: Validators.required, updateOn: "change"}]
    })
    if (this.route.snapshot.queryParamMap.get('add') == null) {
      this.userService.getUserById(this.id).then((user: User) => {
        user.birthdate = formatDate(user.birthdate, 'yyyy-MM-dd', 'en-US')
        this.form.setValue(user);
      })
    }
  }

  onSubmit() {
    if (this.id == null) {
      this.userService.addUser(this.form.value).then(() => {
        this.router.navigate(['/userslist.jhtml']);
      });
    } else {
      this.userService.updateUser(this.form.value).then(() => {
        this.router.navigate(['/userslist.jhtml']);
      });
    }

  }

}
