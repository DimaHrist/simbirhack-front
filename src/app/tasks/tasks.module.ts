import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { TasksRoutingModule } from './tasks-routing.module';



@NgModule({
  declarations: [TasksViewComponent],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
