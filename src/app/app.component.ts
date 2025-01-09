import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { UserInput } from './user-input/user-input.model';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, ResultComponent],
})
export class AppComponent {
  userInput: UserInput | null = null;

  onUserInput(userInput: UserInput) {
    this.userInput = userInput;
  }
}
