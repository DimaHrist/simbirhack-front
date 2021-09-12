import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TasksApiService } from '../../services/tasks-api.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditTaskDialogComponent } from '../add-or-edit-task.dialog/add-or-edit-task.dialog.component';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  public levelsArr = {
    beginner: [],
    elementary: [],
    preIntermediate: [],
    intermediate: [],
    upperIntermediate: [],
    advanced: []
  };

  public levels = [
    {
      title: 'Beginner',
      value: 'beginner'
    },
    {
      title: 'Elementary',
      value: 'elementary'
    },
    {
      title: 'Pre Intermediate',
      value: 'preIntermediate'
    },
    {
      title: 'Intermediate',
      value: 'intermediate'
    },
    {
      title: 'Upper intermediate',
      value: 'upperIntermediate'
    },
    {
      title: 'Advanced',
      value: 'advanced'
    }
  ];

  constructor(
    private readonly tasksApiService: TasksApiService,
    private readonly diaolog: MatDialog,
    private readonly ref: ChangeDetectorRef
  ) {
  }

  public getTasks(): void {
    this.tasksApiService.getTasks()
      .subscribe((tasks) => {
        this.levelsArr = tasks.reduce((acc, t) => {
          acc[t.level] = acc[t.level] || [];
          acc[t.level].push(t);
          return acc;
        }, {});
        this.ref.detectChanges();
      });
  }

  public saveTask(request): void {
    this.tasksApiService.addTask(request)
      .subscribe(() => this.getTasks());
  }

  public editTask(event): void {
    this.openDialog(null, event);
  }

  public deleteTask(id): void {
    this.tasksApiService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  public openDialog(lev?, data?): void {
    this.subscriptions.add(
      this.diaolog.open(AddOrEditTaskDialogComponent, {
        width: '600px',
        height: '700px',
        data: {
          level: lev,
          task: data,
        }
      }).afterClosed()
        .subscribe((request) => {
          if (request && request.id) {
            this.saveTask(request);
          } else if (request) {
            this.saveTask(request);
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
