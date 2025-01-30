import {
  afterNextRender,
  afterRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formData = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedSavedForm = JSON.parse(savedForm);
        setTimeout(() => {
          this.formData()?.controls['email']?.setValue(loadedSavedForm.email);
        });
      }

      const subscription = this.formData()
        ?.valueChanges?.pipe(debounceTime(500))
        .subscribe(({ email }) => {
          localStorage.setItem('saved-login-form', JSON.stringify({ email }));
        });

      this.destroyRef?.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmit({ form }: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    console.log(email, password);
  }
}
