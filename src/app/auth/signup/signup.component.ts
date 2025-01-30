import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const equalPasswords = (control: AbstractControl) => {
  if (control.parent?.get('password')?.value === control.value) {
    return null;
  }
  return { passwordsNotEqual: true };
};

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  isSubmitted = signal(false);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required, equalPasswords]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', [Validators.required]),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  onReset() {
    this.isSubmitted.set(false);
    this.form.reset();
  }
}
