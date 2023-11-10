import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() toggleSideNav = new EventEmitter();

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
