import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { StudentsModel } from '../../components/student-table/student-table.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnDestroy {
  students: StudentsModel[] = [];
  private getStudentsSubscription: Subscription;
  private createStudentSubscription: Subscription;
  private editStudentSubscription: Subscription;
  private removeStudentSubscription: Subscription;

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog) {
    this.getStudentsSubscription = studentsService.getStudents$().subscribe((students: StudentsModel[]) => {
      this.students = students;
    });
  }

  addStudent(): void {
    this.matDialog
      .open(StudentFormComponent)
      .afterClosed()
      .subscribe({
        next: (student) => {
          if (!!student) {
            this.createStudentSubscription = this.studentsService.createStudent$(student).subscribe((students: StudentsModel[]) => {
              this.students = students;
            });
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
            editedStudent.id = selectedStudent.id;
            this.editStudentSubscription = this.studentsService.editStudent$(editedStudent).subscribe((students: StudentsModel[]) => {
              this.students = students;
            });

          }
        }
      });
  }

  onRemoveStudent(studentId: number): void {
    if (confirm(`¿Desea eliminar al estudiante con clave ${studentId}?`)) {
      this.removeStudentSubscription = this.studentsService.removeStudent$(studentId).subscribe((students: StudentsModel[]) => {
        this.students = students;
      })    
    }
  }

  ngOnDestroy() {
    this.getStudentsSubscription?.unsubscribe();
    this.createStudentSubscription?.unsubscribe();
    this.editStudentSubscription?.unsubscribe();
    this.removeStudentSubscription?.unsubscribe();
  }
}
