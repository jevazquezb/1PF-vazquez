import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { Role, User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  users$: Observable<User[]>;
  userRole$: Observable<Role | undefined>;

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.users$ = usersService.getUsers$();

    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  addUser(): void {
    this.matDialog
      .open(UserFormComponent)
      .afterClosed()
      .subscribe({
        next: (user) => {
          if (user) {
            this.users$ = this.usersService.createUser$(user);
          }
        }
      })
  }

  onEditUser(selectedUser: User): void {
    this.matDialog
      .open(UserFormComponent, {
        data: selectedUser
      })
      .afterClosed()
      .subscribe({
        next: (editedUser) => {
          if (!!editedUser) {
            const updatedUser = { ...selectedUser, ...editedUser };
            this.users$ = this.usersService.editUser$(updatedUser);
          }
        }
      })
  }

  onRemoveUser(userId: number): void {
    if (confirm(`¿Desea eliminar el usuario con clave ${userId}?`)) {
      console.log(userId);
      this.users$ = this.usersService.removeUser$(userId);
    }
  }

}
