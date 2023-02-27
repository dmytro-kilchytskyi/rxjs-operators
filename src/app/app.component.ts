import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  search: FormControl = new FormControl();

  readonly MOCK_USERS: Array<{ name: string; age: number }> =
    this.userService.MOCK_USERS;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.handleSearch();
    this.handleUsersUpdate();
    this.handleUserExport();
  }

  updateUser(): void {
    this.userService.update();
  }

  import(): void {
    this.userService.import(this.MOCK_USERS).subscribe({
      next: () => {
        // ...do something with the result
      },
    });
  }

  export(): void {
    this.userService.export();
  }

  private handleSearch(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.apiService.getWithDelay(3000))
      )
      .subscribe({
        next: () => {
          // ...do something with the result
        },
      });
  }

  private handleUsersUpdate(): void {
    this.userService.users$.subscribe({
      next: () => {
        // ...do something with the result
      },
    });
  }

  private handleUserExport(): void {
    this.userService.usersAll$.subscribe({
      next: () => {
        // ...do something with the result
      },
    });
  }
}
