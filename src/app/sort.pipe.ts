import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: number[] | string[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = value.toSorted((a, b) => {
      if (a < b) {
        return direction === 'asc' ? -1 : 1;
      } else if (a > b) {
        return direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sorted;
  }
}
