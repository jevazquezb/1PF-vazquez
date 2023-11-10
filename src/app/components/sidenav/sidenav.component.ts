import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {
  currentUser: User;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
