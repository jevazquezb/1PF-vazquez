import { Injectable } from '@angular/core';
import { Observable, of, map, concatMap } from 'rxjs';
import { Course } from 'src/app/components/course-table/course-table.model';
import { IdService } from './id.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private idService: IdService, private httpClient: HttpClient) { }

  getCourses$(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`);
    // return of(this.courses);
  }

  createCourse$(course: Course): Observable<Course[]> {
    return this.httpClient
      .post<Course>(`${environment.baseUrl}/courses`, course)
      .pipe(concatMap(() => this.getCourses$()));
    // this.courses.push(course);
    // return of([...this.courses]);
  }

  editCourse$(editedCourse: Course): Observable<Course[]> {
    return this.httpClient
      .put<Course>(`${environment.baseUrl}/courses/${editedCourse.id}`, editedCourse)
      .pipe(concatMap(() => this.getCourses$()));
    // this.courses = this.courses.map(course => course.id === editedCourse.id ? { ...course, ...editedCourse } : course);
    // return of([...this.courses]);
  }

  removeCourse$(courseId: number): Observable<Course[]> {
    return this.httpClient
      .delete<Object>(`${environment.baseUrl}/courses/${courseId}`)
      .pipe(concatMap(() => this.getCourses$()));
    // this.courses = this.courses.filter(course => course.id !== courseId);
    // return of([...this.courses]);
  }
}
