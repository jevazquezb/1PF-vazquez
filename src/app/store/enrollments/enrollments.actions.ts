import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from 'src/app/components/enrollments-table/enrollments-table.model';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
  }
});
