import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { User } from '../user/user.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent, NgIf, NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) user!: User;

  isAddingTask = false;

  constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.user.id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
