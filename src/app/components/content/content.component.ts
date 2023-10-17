import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Data, StudentsModel } from '../student-table/student-table.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  students: StudentsModel[] = [];

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog) {
    studentsService.getStudents().subscribe((res: Data) => {
      this.students = res.students;
    });
  }

  openStudentDialog(): void {
    const lastId = this.students[this.students.length - 1].id + 101;

    this.matDialog
      .open(StudentFormComponent)
      .afterClosed()
      .subscribe({
        next: (student) => {
          if (!!student) {
            this.students = [
              ...this.students, 
              {
                ...student,
                id: lastId
              }
            ];
          }
        }
      });
  }

  onEditStudent(selectedStudent: StudentsModel): void {
    this.matDialog
      .open(StudentFormComponent, {
        data: selectedStudent
      })
      .afterClosed()
      .subscribe({
        next: (editedStudent) => {
          if (!!editedStudent) {
            this.students = this.students.map(student =>
              student.id === selectedStudent.id ? { ...student, ...editedStudent} : student  
            );
          }
        }
      });
  }

  onRemoveStudent(studentId: number): void {
    this.students = this.students.filter(student => student.id !== studentId);    
  }
}
