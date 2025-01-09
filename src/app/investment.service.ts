import { Injectable, signal } from '@angular/core';
import { UserInput } from './user-input/user-input.model';
import { InvestmentResult } from './result/result.model';

export const calculateInvestmentResults = (userInput: UserInput) => {
  const { initialInvestment, annualInvestment, expectedReturn, duration } =
    userInput;
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    const totalInterest =
      investmentValue - annualInvestment * year - initialInvestment;
    annualData.push({
      year: year,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
      totalInterest: totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    });
  }

  return annualData;
};

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  result = signal<InvestmentResult[] | null>(null);

  calculate(userInput: UserInput) {
    this.result.set(calculateInvestmentResults(userInput));
  }
}
