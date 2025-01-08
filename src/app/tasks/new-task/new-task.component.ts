import { TasksService } from './../tasks.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();

  constructor(private tasksService: TasksService) {}

  enteredTaskTitle = '';
  enteredTaskSummary = '';
  enteredTaskDueDate = '';

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(this.userId, {
      title: this.enteredTaskTitle,
      summary: this.enteredTaskSummary,
      dueDate: this.enteredTaskDueDate,
    });
    this.onClose();
  }
}
