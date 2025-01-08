import { Component, computed, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTask, Task } from './task/task.model';
import { User } from '../user/user.model';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  user = input.required<User>();

  tasks: Task[] = DUMMY_TASKS;

  isAddingTask = false;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.user().id);
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(newTask: NewTask) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.user().id,
      ...newTask,
    });
    this.isAddingTask = false;
  }
}
