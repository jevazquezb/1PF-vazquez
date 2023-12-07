import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { EnrollmentActions } from 'src/app/store/enrollments/enrollments.actions';
import { StudentsModel } from '../student-table/student-table.model';
import { Course } from '../course-table/course-table.model';
import { selectClasses, selectCourses, selectStudents } from 'src/app/store/enrollments/enrollments.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseClass } from '../class-table/class-table.model';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enrollments-form',
  templateUrl: './enrollments-form.component.html',
  styleUrls: ['./enrollments-form.component.scss']
})
export class EnrollmentsFormComponent {
  students$: Observable<StudentsModel[]>;
  courses$: Observable<Course[]>;
  classes$: Observable<CourseClass[]>
  enrollmentsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EnrollmentsFormComponent>,
    private store: Store,
    private action$: Actions
  ) {
    this.store.dispatch(EnrollmentActions.loadEnrollmentOptions());

    this.students$ = this.store.select(selectStudents);
    this.courses$ = this.store.select(selectCourses);
    this.classes$ = this.store.select(selectClasses);

    this.enrollmentsForm = this.formBuilder.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
      classId: [null, Validators.required]
    });

    this.action$
      .pipe(ofType(EnrollmentActions.loadEnrollments), take(1))
      .subscribe({
        next: () => this.matDialogRef.close()
      })
  }

  onSubmit(): void {
    this.store.dispatch(EnrollmentActions.enrollStudent({ enrollmentPayload: this.enrollmentsForm.value }));
  }
}
