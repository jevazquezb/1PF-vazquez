import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from 'src/app/store/enrollments/enrollments.actions';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent {

  constructor(private store: Store) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

}
