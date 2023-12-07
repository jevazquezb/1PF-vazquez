import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CourseFormComponent } from 'src/app/components/course-form/course-form.component';
import { Course } from 'src/app/components/course-table/course-table.model';
import { Role } from 'src/app/shared/models/user.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  courses$: Observable<Course[]>;
  userRole$: Observable<Role | undefined>;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.courses$ = coursesService.getCourses$();

    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  addCourse(): void {
    this.matDialog
      .open(CourseFormComponent)
      .afterClosed()
      .subscribe({
        next: (course) => {
          if (course) {
            this.courses$ = this.coursesService.createCourse$(course);
          }
        },
      });
  }

  onEditCourse(selectedCourse: Course): void {
    this.matDialog
      .open(CourseFormComponent, {
        data: selectedCourse
      })
      .afterClosed()
      .subscribe({
        next: (editedCourse) => {
          if (!!editedCourse) {
            editedCourse.id = selectedCourse.id;
            this.courses$ = this.coursesService.editCourse$(editedCourse);
          }
        }
      });
  }

  onRemoveCourse(courseId: number): void {
    if (confirm(`¿Desea eliminar el curso con clave ${courseId}?`)) {
      this.courses$ = this.coursesService.removeCourse$(courseId);
    }
  }
}
