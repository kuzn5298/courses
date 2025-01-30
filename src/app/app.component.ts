import { Component, signal } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { LoginReactiveComponent } from './auth/login-reactive/login-reactive.component';
import { SignupComponent } from './auth/signup/signup.component';

type FormType = 'login-ng-form' | 'login-reactive-form' | 'signup-form';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, LoginReactiveComponent, SignupComponent],
})
export class AppComponent {
  formType = signal<FormType>('signup-form');

  selectForm(type: FormType) {
    this.formType.set(type);
  }
}
