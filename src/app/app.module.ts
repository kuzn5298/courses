import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor, NgIf } from '@angular/common';
import { AppComponent } from './app.component';
import { TasksService } from './tasks/tasks.service';
import { HeaderModule } from './header/header.module';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, HeaderModule, UserModule, TasksModule, NgFor, NgIf],
})
export class AppModule {}
