import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollments.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { Enrollment } from 'src/app/components/enrollments-table/enrollments-table.model';


@Injectable()
export class EnrollmentsEffects {

  loadEnrollmentss$ = createEffect(() => {
    return this.actions$.pipe(

      // Filter actions of type EnrollmentActions.loadEnrollments
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getEnrollments().pipe(
          // if request OK, fire EnrollmentActions.loadEnrollmentsSuccess
          map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),

          // if request fails, fire nrollmentsActions.loadEnrollmentsFailure
          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?_expand=course&_expand=student&_expand=class`);
  }
}
