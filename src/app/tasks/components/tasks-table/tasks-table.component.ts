import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  @Input() displayedColumns;
  @Input() dataSource;
  @Output() deleteTaskEvent = new EventEmitter<any>();
  @Output() editTaskEvent = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void { }

}
