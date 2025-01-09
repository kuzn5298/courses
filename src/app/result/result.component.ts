import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UserInput } from '../user-input/user-input.model';
import { InvestmentResult } from './result.model';
import { calculateInvestmentResults } from './result.utils';

@Component({
  selector: 'app-result',
  imports: [CurrencyPipe],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  userInput = input.required<UserInput>();
  investmentResults = computed<InvestmentResult[]>(() =>
    calculateInvestmentResults(this.userInput())
  );
}
