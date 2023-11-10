import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = '1PF-vazquez';
  showSideNav = true;
  isLoggedIn: boolean = false;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
        this.showSideNav = !!user
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
