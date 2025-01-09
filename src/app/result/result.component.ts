import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentResult } from './result.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-result',
  imports: [CurrencyPipe],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  private investmentService = inject(InvestmentService);
  investmentResults = computed<InvestmentResult[] | null>(
    this.investmentService.result
  );
}
