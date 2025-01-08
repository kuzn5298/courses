import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  id = input.required<string>();
  avatar = input.required<string>();
  name = input.required<string>();

  select = output<string>();

  imagePath = computed(() => `assets/users/${this.avatar()}`);

  onSelectUser() {
    this.select.emit(this.id());
  }
}
