import { Component } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedUser?: User;

  users = DUMMY_USERS;

  onSelectUser(user: User) {
    this.selectedUser = user;
  }
}
