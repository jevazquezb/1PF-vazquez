import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsModel } from 'src/app/components/student-table/student-table.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  url: string = '../../../assets/data/base-alumnos.json';
  currentStudentList: StudentsModel[];

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(this.url);
  }
}
