import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

const customInterval = (delay: number) => {
  return new Observable<number>((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
      subscriber.next(count++);

      if (count >= 11) {
        subscriber.complete();
      }
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  });
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [AsyncPipe],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  counter = signal(0);
  private counter$ = toObservable(this.counter);

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  customInterval$ = customInterval(1000);

  ngOnInit() {
    const subscriptionCounter = this.counter$.subscribe((counter) => {
      console.log('Counter:', counter);
    });

    const subscriptionInterval = this.interval$.subscribe((interval) => {
      console.log('Interval:', interval);
    });

    this.destroyRef.onDestroy(() => {
      subscriptionCounter.unsubscribe();
      subscriptionInterval.unsubscribe();
    });
  }

  increment() {
    this.counter.update((counter) => counter + 1);
  }
}
