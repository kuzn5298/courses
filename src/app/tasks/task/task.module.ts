import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskComponent } from './task.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TaskComponent],
  imports: [SharedModule, DatePipe],
  exports: [TaskComponent],
})
export class TaskModule {}
