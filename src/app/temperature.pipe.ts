import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    if (!value) {
      return value;
    }

    const val = typeof value === 'string' ? parseFloat(value) : value;

    let outputTemp: number;

    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val;
    }

    let symbol: '°C' | '°F';

    outputType ??= inputType;
    if (outputType === 'cel') {
      symbol = '°C';
    } else {
      symbol = '°F';
    }

    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
