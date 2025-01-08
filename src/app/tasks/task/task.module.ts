import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskComponent } from './task.component';
import { CardModule } from '../../shared/card/card.module';

@NgModule({
  declarations: [TaskComponent],
  imports: [CardModule, DatePipe],
  exports: [TaskComponent],
})
export class TaskModule {}
