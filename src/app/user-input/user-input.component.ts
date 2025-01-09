import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInput } from './user-input.model';

const INITIAL_FORM_VALUE: UserInput = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
};

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent implements OnInit {
  private fb = inject(FormBuilder);
  calculate = output<UserInput>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group(INITIAL_FORM_VALUE);
  }

  onSubmit() {
    this.calculate.emit(this.form.value);
  }
}
