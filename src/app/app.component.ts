import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './user/user.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent, NgFor, NgIf],
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
