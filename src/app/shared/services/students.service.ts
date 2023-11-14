import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsModel } from 'src/app/components/student-table/student-table.model';
import { environment } from 'src/environments/environment.local';
import { Observable, concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  url: string = '../../../assets/data/base-alumnos.json';
  currentStudentList: StudentsModel[];

  constructor(private httpClient: HttpClient) { }

  getStudents$(): Observable<StudentsModel[]> {
    return this.httpClient.get<StudentsModel[]>(`${environment.baseUrl}/students`);
  }

  createStudent$(student: StudentsModel): Observable<StudentsModel[]> {
    return this.httpClient
      .post<StudentsModel>(`${environment.baseUrl}/students`, student)
      .pipe(concatMap(() => this.getStudents$()));
  }

  editStudent$(editedStudent: StudentsModel): Observable<StudentsModel[]> {
    return this.httpClient
      .put<StudentsModel>(`${environment.baseUrl}/students/${editedStudent.id}`, editedStudent)
      .pipe(concatMap(() => this.getStudents$()));
  }

  removeStudent$(studentId: number): Observable<StudentsModel[]> {
    return this.httpClient
      .delete<Object>(`${environment.baseUrl}/students/${studentId}`)
      .pipe(concatMap(() => this.getStudents$()));
  }
}
