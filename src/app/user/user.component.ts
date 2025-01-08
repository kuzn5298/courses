import { Component, computed, input, output } from '@angular/core';
import { User } from '../dummy-users';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input.required<User>();
  active = input<boolean>();

  select = output<User>();

  imagePath = computed(() => `assets/users/${this.user().avatar}`);

  onSelectUser() {
    this.select.emit(this.user());
  }
}
