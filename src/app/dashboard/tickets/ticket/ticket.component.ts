import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  visible = signal(false);
  close = output();

  onToggleVisibility() {
    this.visible.update((visible) => !visible);
  }

  onMarkAsClosed() {
    this.close.emit();
  }
}
