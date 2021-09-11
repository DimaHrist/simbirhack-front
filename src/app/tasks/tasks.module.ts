import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';


@NgModule({
  declarations: [
    TasksViewComponent,
    TasksTableComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule {
}
