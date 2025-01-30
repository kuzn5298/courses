import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { debounceTime, delay, map, of } from 'rxjs';

const mustContainQuestionMark = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
};

const emailIsUnique = (control: AbstractControl) => {
  console.log('Checking if email is unique...');
  if (!control.value) return of(null);

  return of(control.value === 'test@example.com').pipe(
    delay(500),
    map((isTaken) => (isTaken ? { emailTaken: true } : null))
  );
};

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
})
export class LoginReactiveComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private isSubmitted = signal(false);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
      updateOn: 'blur',
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      mustContainQuestionMark,
    ]),
  });

  get emailIsInvalid() {
    return this.isSubmitted() && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.isSubmitted() && this.form.controls.password.invalid;
  }

  ngOnInit() {
    const savedForm = localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedSavedForm = JSON.parse(savedForm);
      this.form.patchValue(loadedSavedForm);
    }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(({ email }) => {
        localStorage.setItem('saved-login-form', JSON.stringify({ email }));
      });

    this.destroyRef?.onDestroy(() => {
      subscription?.unsubscribe();
    });
  }

  onSubmit() {
    this.isSubmitted.set(true);

    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;
    console.log(email, password);
  }
}
