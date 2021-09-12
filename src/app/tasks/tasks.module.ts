import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksApiService } from './services/tasks-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AddOrEditTaskDialogComponent } from './components/add-or-edit-task.dialog/add-or-edit-task.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksViewComponent,
    TasksTableComponent,
    AddOrEditTaskDialogComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TasksApiService,
  ]
})
export class TasksModule {
}
