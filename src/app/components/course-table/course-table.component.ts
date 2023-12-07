import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from './course-table.model';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Role } from 'src/app/shared/models/user.model';

@Component({
  selector: 'course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  userRole$: Observable<Role | undefined>;
  
  @Input() dataSource: Course[];

  @Output() removeCourse = new EventEmitter<number>();

  @Output() editCourse = new EventEmitter<Course>();

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  navigateToCourse(course: Course): void {
    this.router.navigate(['courses', course.id], {
      state: course
    });
  }
}
