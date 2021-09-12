import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  constructor(private readonly http: HttpClient) { }

  public getTasks(): Observable<any> {
    return this.http.get('/api/tasks');
  }

  public addTask(request): Observable<any> {
    return this.http.post('/api/tasks', request);
  }

  public editTask(): Observable<any> {
    return this.http.get('');
  }

  public deleteTask(id: string): Observable<any> {
    return this.http.delete(`/api/tasks/${id}`);
  }
}
