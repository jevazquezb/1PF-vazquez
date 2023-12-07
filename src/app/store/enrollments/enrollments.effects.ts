import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { EnrollmentActions } from './enrollments.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { Enrollment, EnrollmentPayload } from 'src/app/components/enrollments-table/enrollments-table.model';
import { Course } from 'src/app/components/course-table/course-table.model';
import { StudentsModel } from 'src/app/components/student-table/student-table.model';
import { CourseClass } from 'src/app/components/class-table/class-table.model';


@Injectable()
export class EnrollmentsEffects {

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      // Filter actions of type EnrollmentActions.loadEnrollments
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getEnrollments().pipe(
          // if request OK, fire EnrollmentActions.loadEnrollmentsSuccess
          map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),

          // if request fails, fire EnrollmentsActions.loadEnrollmentsFailure
          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });

  loadEnrollmentOptions$ = createEffect(() => this.actions$.pipe(
    ofType(EnrollmentActions.loadEnrollmentOptions),
    concatMap(() =>
      this.getEnrollmentOptions().pipe(
        map(response => EnrollmentActions.loadEnrollmentOptionsSuccess(response)),
        catchError(error => of(EnrollmentActions.loadEnrollmentOptionsFailure({ error })))
    ))
  ));

  enrollStudent$ = createEffect(() => this.actions$.pipe(
    ofType(EnrollmentActions.enrollStudent),
    concatMap((action) =>
      this.enrollStudent(action.enrollmentPayload).pipe(
        map(() => EnrollmentActions.loadEnrollments()),
        catchError(error => of(EnrollmentActions.enrollStudentFailure({ error })))
    ))
  ));

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?_expand=course&_expand=student&_expand=class`);
  }

  getEnrollmentOptions(): Observable<{ students: StudentsModel[]; courses: Course[], classes: CourseClass[] }> {
    return forkJoin([
      this.httpClient.get<StudentsModel[]>(`${environment.baseUrl}/students`),
      this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`),
      this.httpClient.get<CourseClass[]>(`${environment.baseUrl}/classes`)      
    ]).pipe(
      map(([students, courses, classes]) => {
        return {
          students,
          courses,
          classes
        };
      })
    );
  }

  enrollStudent(enrollmentPayload: EnrollmentPayload): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(`${environment.baseUrl}/enrollments`, enrollmentPayload)
  }
}
