import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';

const routes: Routes = [
  {
    path: '',
    component: TasksViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {
}
