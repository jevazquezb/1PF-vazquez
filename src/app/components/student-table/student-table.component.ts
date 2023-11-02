import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentsModel } from './student-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'age', 'grades', 'actions'];
  
  @Input() dataSource: StudentsModel[];

  @Output() removeStudent = new EventEmitter<number>();

  @Output() editStudent = new EventEmitter<StudentsModel>();

  constructor(private router: Router) { }

  navigateToStudent(student: StudentsModel): void {
    this.router.navigate(['students', student.id], {
      state: student
    });
  }
}
