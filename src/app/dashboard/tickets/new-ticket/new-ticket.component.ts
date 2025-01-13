import {
  Component,
  ElementRef,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket/ticket.model';

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<Pick<Ticket, 'title' | 'request'>>();

  ticketTitle = signal('');
  ticketRequest = signal('');

  onSubmit() {
    this.add.emit({ title: this.ticketTitle(), request: this.ticketRequest() });

    this.form().nativeElement.reset();
  }
}
