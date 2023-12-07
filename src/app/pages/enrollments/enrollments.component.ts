import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EnrollmentsFormComponent } from 'src/app/components/enrollments-form/enrollments-form.component';
import { EnrollmentActions } from 'src/app/store/enrollments/enrollments.actions';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent {

  constructor(
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  addEnrollment(): void {
    this.matDialog
      .open(EnrollmentsFormComponent);         
  }

}
