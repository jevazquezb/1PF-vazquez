import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment } from './enrollments-table.model';
import { selectEnrollments } from 'src/app/store/enrollments/enrollments.selectors';

@Component({
  selector: 'enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss']
})
export class EnrollmentsTableComponent {
  displayedColumns: string[] = ['id', 'student', 'course', 'professor', 'schedule', 'actions'];
  enrollments$: Observable<Enrollment[]>;

  constructor(private store: Store) {
    this.enrollments$ = this.store.select(selectEnrollments);
  }

}
