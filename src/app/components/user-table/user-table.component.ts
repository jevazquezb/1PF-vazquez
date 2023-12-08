import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Role, User } from 'src/app/shared/models/user.model';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  userRole$: Observable<Role | undefined>;
  
  @Input() dataSource: User[];

  @Output() removeUser = new EventEmitter<number>();

  @Output() editUser = new EventEmitter<User>();

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  navigateToUser(user: User): void {
    this.router.navigate(['users', user.id], {
      state: user
    });
  }
}
