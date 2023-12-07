import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CourseClass } from 'src/app/components/class-table/class-table.model';
import { Course } from 'src/app/components/course-table/course-table.model';
import { Enrollment, EnrollmentPayload } from 'src/app/components/enrollments-table/enrollments-table.model';
import { StudentsModel } from 'src/app/components/student-table/student-table.model';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Enrollment Options': emptyProps(),
    'Load Enrollment Options Success': props<{ students: StudentsModel[]; courses: Course[], classes: CourseClass[] }>(),
    'Load Enrollment Options Failure': props<{ error: unknown }>(),
    'Enroll Student': props<{ enrollmentPayload: EnrollmentPayload }>(),
    // 'Enroll Student Success': props<{ enrollment: EnrollmentPayload }>(),
    'Enroll Student Failure': props<{ error: unknown }>()
  }
});
