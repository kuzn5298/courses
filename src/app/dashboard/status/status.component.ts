import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

type CurrentStatus = 'online' | 'offline' | 'unknown';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent implements OnInit {
  currentStatus = signal<CurrentStatus>('online');
  private destroyRef = inject(DestroyRef);

  // constructor() {
  //   effect((onCleanup) => {
  //     console.log('Status changed to:', this.currentStatus());

  //     onCleanup(() => {
  //       console.log('Cleanup function');
  //     });
  //   });
  // }

  ngOnInit() {
    const interval = setInterval(() => {
      this.updateStatus();
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  updateStatus() {
    const rnd = Math.random();

    if (rnd < 0.5) {
      this.currentStatus.set('online');
    } else if (rnd < 0.9) {
      this.currentStatus.set('offline');
    } else {
      this.currentStatus.set('unknown');
    }
  }
}
