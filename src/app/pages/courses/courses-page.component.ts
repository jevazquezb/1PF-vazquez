import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourseFormComponent } from 'src/app/components/course-form/course-form.component';
import { Course } from 'src/app/components/course-table/course-table.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
  ) {
    this.courses$ = coursesService.getCourses$();
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
