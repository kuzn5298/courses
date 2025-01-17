import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskServiceToken } from '../../../../main';
import { TASK_STATUS_OPTIONS_TOKEN } from './../../task.model';
import { Task, TaskStatus, taskStatusOptionsProvider } from '../../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [taskStatusOptionsProvider],
})
export class TaskItemComponent {
  private taskService = inject(TaskServiceToken);
  task = input.required<Task>();
  taskStatusOptions = inject(TASK_STATUS_OPTIONS_TOKEN);

  taskStatus = computed(() => {
    const status = this.task().status ?? 'OPEN';
    const option = this.taskStatusOptions.find(
      (option) => option.status === status
    );

    return option?.text;
  });

  onChangeTaskStatus(taskId: string, status: string) {
    const option = this.taskStatusOptions.find(
      (option) => option.value === status
    );
    const newStatus: TaskStatus = option?.status ?? 'OPEN';
    this.taskService.onTaskStatusChange(taskId, newStatus);
  }
}
