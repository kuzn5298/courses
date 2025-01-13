import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { SortPipe } from './sort.pipe';

@Component({
  selector: 'app-root',
  imports: [DatePipe, TemperaturePipe, SortPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentDate = new Date();
  direction: 'desc' | 'asc' = 'asc';
  currentTemperatures = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onToggleDirection() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
  }

  // not working correctly because sort is in pipe
  onReset(index: number) {
    this.historicTemperatures = [...this.historicTemperatures];
    this.historicTemperatures[index] = 18;
  }
}
