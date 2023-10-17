import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsModel } from './student-table.model';

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
}
