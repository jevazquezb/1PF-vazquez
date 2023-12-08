import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Role, User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {
  currentUser: User;
  userRole$: Observable<Role | undefined>;
  private userSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store) {
    this.userSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });

    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
