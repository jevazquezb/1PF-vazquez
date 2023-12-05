import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentsModel } from './student-table.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'age', 'grades', 'actions'];
  userRole$: Observable<'ADMIN' | 'USER' | undefined>;
  
  @Input() dataSource: StudentsModel[];

  @Output() removeStudent = new EventEmitter<number>();

  @Output() editStudent = new EventEmitter<StudentsModel>();

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  navigateToStudent(student: StudentsModel): void {
    this.router.navigate(['students', student.id], {
      state: student
    });
  }
}
