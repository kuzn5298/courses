import { NgModule } from '@angular/core';
import { NewTaskComponent } from './new-task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewTaskComponent],
  imports: [FormsModule],
  exports: [NewTaskComponent],
})
export class NewTaskModule {}
