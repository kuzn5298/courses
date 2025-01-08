import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTask, Task } from './task/task.model';

const LOCAL_STORAGE_KEY = 'tasks';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor() {
    this.tasks = this.loadTasks();
  }

  getUserTasks(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(userId: string, newTask: NewTask): void {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId,
      ...newTask,
    });
    this.saveTasks();
  }

  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  loadTasks(): Task[] {
    const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : DUMMY_TASKS;
  }

  saveTasks(): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.tasks));
  }
}
