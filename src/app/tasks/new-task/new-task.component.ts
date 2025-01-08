import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  cancel = output<void>();
  add = output<NewTask>();

  enteredTaskTitle = '';
  enteredTaskSummary = '';
  enteredTaskDueDate = '';

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.enteredTaskTitle,
      summary: this.enteredTaskSummary,
      dueDate: this.enteredTaskDueDate,
    });
  }
}
