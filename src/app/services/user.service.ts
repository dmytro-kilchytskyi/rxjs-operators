import { Injectable } from '@angular/core';
import {
  concatMap,
  exhaustMap,
  from,
  mergeMap,
  Observable,
  Subject,
} from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  users$: Observable<null>;
  usersAll$: Observable<null>;
  readonly MOCK_USERS: Array<{ name: string; age: number }> = [
    { name: 'Alex', age: 10 },
    { name: 'Monica', age: 19 },
    { name: 'John', age: 34 },
  ];

  private readonly updateSubject$: Subject<void> = new Subject<void>();
  private readonly exportSubject$: Subject<void> = new Subject<void>();
  private readonly updateObservable$: Observable<void> =
    this.updateSubject$.asObservable();
  private readonly exportObservable$: Observable<void> =
    this.exportSubject$.asObservable();

  constructor(private apiService: ApiService) {
    this.users$ = this.updateObservable$.pipe(
      mergeMap(() => this.apiService.getWithDelay(1000))
    );
    this.usersAll$ = this.exportObservable$.pipe(
      exhaustMap(() => this.apiService.getWithDelay(5000))
    );
  }

  update(): void {
    this.updateSubject$.next();
  }

  import(users: Array<{ name: string; age: number }>): Observable<null> {
    return from(users).pipe(
      concatMap(() => this.apiService.getWithDelay(1500))
    );
  }

  export(): void {
    this.exportSubject$.next();
  }
}
