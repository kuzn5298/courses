import { TasksService } from './../tasks.service';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  close = output<void>();

  private tasksService = inject(TasksService);

  enteredTaskTitle = '';
  enteredTaskSummary = '';
  enteredTaskDueDate = '';

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(this.userId(), {
      title: this.enteredTaskTitle,
      summary: this.enteredTaskSummary,
      dueDate: this.enteredTaskDueDate,
    });
    this.onClose();
  }
}
