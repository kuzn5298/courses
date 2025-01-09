import { InvestmentService } from './../investment.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInput } from './user-input.model';

const INITIAL_FORM_VALUE: UserInput = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 5,
  duration: 10,
};

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  private fb = inject(FormBuilder);
  private investmentService = inject(InvestmentService);

  form = signal<FormGroup>(this.fb.group(INITIAL_FORM_VALUE));

  onSubmit() {
    this.investmentService.calculate(this.form().value);
  }
}
