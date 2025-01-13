import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  host: {
    '(click)': 'onLog($event)',
  },
})
export class LogDirective {
  private elementRef = inject(ElementRef);
  constructor() {}

  onLog(event: MouseEvent) {
    console.log('Element clicked');
    console.log(this.elementRef.nativeElement);
  }
}
