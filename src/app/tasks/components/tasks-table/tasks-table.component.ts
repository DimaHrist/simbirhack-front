import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  @Input() displayedColumns;
  @Input() dataSource;

  constructor() { }

  ngOnInit(): void {
  }

}
