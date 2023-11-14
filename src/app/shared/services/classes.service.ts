import { Injectable } from '@angular/core';
import { IdService } from './id.service';
import { CourseClass } from 'src/app/components/class-table/class-table.model';
import { Observable, concatMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  static readonly BUSINESS_DAYS: string[] = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'
  ];

  constructor(private idService: IdService, private httpClient: HttpClient) { }

  getClasses$(): Observable<CourseClass[]> {
    return this.httpClient.get<CourseClass[]>(`${environment.baseUrl}/classes`);
    // return of(this.classes);
  }

  createClass$(courseClass: CourseClass): Observable<CourseClass[]> {
    return this.httpClient
      .post<CourseClass>(`${environment.baseUrl}/classes`, courseClass)
      .pipe(concatMap(() => this.getClasses$()));
    // this.classes.push(courseClass);
    // return of([...this.classes]);
  }

  editClass$(editedClass: CourseClass): Observable<CourseClass[]> {
    return this.httpClient
      .put<CourseClass>(`${environment.baseUrl}/classes/${editedClass.id}`, editedClass)
      .pipe(concatMap(() => this.getClasses$()));
    // this.classes = this.classes.map(courseClass => courseClass.id === editedClass.id ? { ...courseClass, ...editedClass } : courseClass);
    // return of([...this.classes]);
  }

  removeClass$(classId: number): Observable<CourseClass[]> {
    return this.httpClient
      .delete<Object>(`${environment.baseUrl}/classes/${classId}`)
      .pipe(concatMap(() => this.getClasses$()));
    // this.classes = this.classes.filter(courseClass => courseClass.id !== classId);
    // return of([...this.classes]);
  }

  private getTime(date: Date, hours?: number): string {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const hrs = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return hrs + ':' + min;     
  }
}
