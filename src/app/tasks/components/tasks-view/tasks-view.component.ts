import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public panelOpenState = false;

  public displayedColumns = [
    'publicationDate',
    'task',
    'theme',
    'questionsQuantity',
    'actions'
  ];

  public dataSource = [
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, London is the capital of Great Britain,its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 5},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 8},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 7},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 11},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 7},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 12},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 6},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 5},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 14},
    {publicationDate: '11.09.2021 17:08', task: 'London is the capital of Great Britain, its political, economic and cultural centre. Its one of the largest cities in the world.', theme: 'Task', questionsQuantity: 5},
  ];
  public levels = [
    'Beginner',
    'Elementary',
    'Pre Intermediate',
    'Intermediate',
    'Upper intermediate',
    'Advanced'
  ];

  constructor() {
  }

  ngOnInit(): void { }

}
