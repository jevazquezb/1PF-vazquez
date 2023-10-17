import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  url: string = '../../../assets/data/base-alumnos.json';

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(this.url);
  }
}