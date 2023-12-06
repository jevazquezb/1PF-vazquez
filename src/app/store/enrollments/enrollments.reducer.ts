import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollments.actions';
import { Enrollment } from 'src/app/components/enrollments-table/enrollments-table.model';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  isLoading: boolean;
  enrollments: Enrollment[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  enrollments: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => ({ ...state, isLoading: true })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => ({ ...state, isLoading: true, enrollments: action.data })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => ({ ...state, isLoading: false, error: action.error })),
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

