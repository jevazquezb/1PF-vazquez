import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { Data, StudentsModel } from '../../components/student-table/student-table.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  students: StudentsModel[] = [];

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog) {
    studentsService.getStudents().subscribe((res: Data) => {
      this.students = studentsService.currentStudentList ?? res.students;
    });
  }

  addStudent(): void {
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
            this.studentsService.currentStudentList = [...this.students];
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
            this.studentsService.currentStudentList = [...this.students];
          }
        }
      });
  }

  onRemoveStudent(studentId: number): void {
    this.students = this.students.filter(student => student.id !== studentId);
    this.studentsService.currentStudentList = [...this.students];
  }
}
