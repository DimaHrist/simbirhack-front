import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ = new BehaviorSubject<any>({login: 'admin', password: 'admin'});

  public currentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public login(loginValue: string, passwordValue: string): void {
    this.currentUser$.next({login: loginValue, password: passwordValue});
  }

  public logout(): void {
    this.currentUser$.next(null);
  }
}
