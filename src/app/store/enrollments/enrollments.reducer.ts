import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollments.actions';
import { Enrollment } from 'src/app/components/enrollments-table/enrollments-table.model';
import { Course } from 'src/app/components/course-table/course-table.model';
import { StudentsModel } from 'src/app/components/student-table/student-table.model';
import { CourseClass } from 'src/app/components/class-table/class-table.model';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  isLoading: boolean;
  isLoadingOptions: boolean;
  students: StudentsModel[];
  courses: Course[];
  classes: CourseClass[];
  enrollments: Enrollment[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingOptions: false,
  students: [],
  courses: [],
  classes: [],
  enrollments: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => ({ ...state, isLoading: true })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => ({ ...state, isLoading: true, enrollments: action.data })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => ({ ...state, isLoading: false, error: action.error })),
  on(EnrollmentActions.loadEnrollmentOptions, state =>({ ...state, isLoadingOptions: true })),
  on(EnrollmentActions.loadEnrollmentOptionsSuccess, (state, action) => ({
    ...state,
    isLoadingOptions: true,
    students: action.students,
    courses: action.courses,
    classes: action.classes
  })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => ({ ...state, isLoadingOptions: false, error: action.error })),
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

