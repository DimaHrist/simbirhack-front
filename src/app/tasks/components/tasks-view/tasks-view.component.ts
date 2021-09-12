import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TasksApiService } from '../../services/tasks-api.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditTaskDialogComponent } from '../add-or-edit-task.dialog/add-or-edit-task.dialog.component';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public panelOpenState = false;
  public subscriptions = new Subscription();

  public displayedColumns = [
    'publicationDate',
    'task',
    'theme',
    'questionsQuantity',
    'actions'
  ];

  public test = {
    beginner: [],
    elementary: [],
    preIntermediate: [],
    intermediate: [],
    upperIntermediate: [],
    advanced: []
  };

  public levels = [
    'Beginner',
    'Elementary',
    'Pre Intermediate',
    'Intermediate',
    'Upper intermediate',
    'Advanced'
  ];

  constructor(
    private readonly tasksApiService: TasksApiService,
    private readonly diaolog: MatDialog
  ) {
  }

  public getTasks(): void {
    this.tasksApiService.getTasks()
      .subscribe((tasks) => {
        tasks.reduce((acc, t) => {
          acc[t.level.toLowerCase()].push(t);
          return acc;
        }, this.test);
      });
  }

  public addTask(request): void {
    this.tasksApiService.addTask(request)
      .subscribe(() => this.getTasks());
  }

  public editTask(event): void {
    this.openDialog(null, event);
    // this.tasksApiService.editTask().subscribe();
  }

  public deleteTask(id): void {
    this.tasksApiService.deleteTask(id).subscribe();
  }

  public openDialog(lev?, data?): void {
    this.subscriptions.add(
      this.diaolog.open(AddOrEditTaskDialogComponent, {
        width: '500px',
        height: '700px',
        data: {
          level: lev,
          task: data,
        }
      }).afterClosed()
        .subscribe((request) => {
          if (request) {
            this.addTask(request);
          }
        })
    );
  }

  public ngOnInit(): void {
    this.getTasks();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
