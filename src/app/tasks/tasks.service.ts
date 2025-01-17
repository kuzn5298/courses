import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: Omit<Task, 'id' | 'status'>) {
    const task: Task = {
      id: Math.random().toString(36).slice(2, 9),
      status: 'OPEN',
      ...taskData,
    };
    this.tasks.update((tasks) => [...tasks, task]);
  }
}
