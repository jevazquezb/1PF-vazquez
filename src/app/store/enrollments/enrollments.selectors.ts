import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollments from './enrollments.reducer';

export const selectEnrollmentsState = createFeatureSelector<fromEnrollments.State>(
  fromEnrollments.enrollmentsFeatureKey
);

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
);

export const selectStudents = createSelector(
  selectEnrollmentsState,
  (state) => state.students
);

export const selectCourses = createSelector(
  selectEnrollmentsState,
  (state) => state.courses
);

export const selectClasses = createSelector(
  selectEnrollmentsState,
  (state) => state.classes
);
