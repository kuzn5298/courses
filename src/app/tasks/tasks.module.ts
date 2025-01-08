import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TaskModule } from './task/task.module';
import { NewTaskModule } from './new-task/new-task.module';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

@NgModule({
  declarations: [TasksComponent],
  imports: [TaskModule, NewTaskModule, NgIf, NgFor],
  exports: [TasksComponent],
  providers: [TasksService],
})
export class TasksModule {}
