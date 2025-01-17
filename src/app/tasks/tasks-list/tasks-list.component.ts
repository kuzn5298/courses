import { Component, computed, inject, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskServiceToken } from '../../../main';
import {
  TASK_STATUS_OPTIONS_TOKEN,
  taskStatusOptionsProvider,
} from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  private tasksService = inject(TaskServiceToken);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS_TOKEN);

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
