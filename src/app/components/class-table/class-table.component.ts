import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseClass } from './class-table.model';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Role } from 'src/app/shared/models/user.model';

@Component({
  selector: 'class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss']
})
export class ClassTableComponent {
  displayedColumns: string[] = ['id', 'name', 'day', 'schedule', 'actions'];
  userRole$: Observable<Role | undefined>;

  @Input() dataSource: CourseClass[];

  @Output() removeClass = new EventEmitter<number>();

  @Output() editClass = new EventEmitter<CourseClass>();

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  navigateToClass(courseClass: CourseClass): void {
    this.router.navigate(['classes', courseClass.id], {
      state: courseClass
    });
  }

}
