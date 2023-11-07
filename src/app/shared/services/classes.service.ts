import { Injectable } from '@angular/core';
import { IdService } from './id.service';
import { CourseClass } from 'src/app/components/class-table/class-table.model';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/components/course-table/course-table.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  static readonly BUSINESS_DAYS: string[] = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'
  ];
  
  classes: CourseClass[] = [
    {
      id: this.idService.generateId(),
      name: 'Desarrollo web',
      day: 'Miércoles',
      startTime: this.getTime(new Date, 0),
      endTime: this.getTime(new Date, 2),
      professor: 'María Vallejo'
    },
    {
      id: this.idService.generateId(),
      name: 'Javascript',
      day: 'Jueves',
      startTime: this.getTime(new Date, 0),
      endTime: this.getTime(new Date, 2),
      professor: 'Brendan Eich'
    },
    {
      id: this.idService.generateId(),
      name: 'Angular',
      day: 'Lunes',
      startTime: this.getTime(new Date, 0),
      endTime: this.getTime(new Date, 2),
      professor: 'Josue Báez'
    },
    {
      id: this.idService.generateId(),
      name: 'Ruby',
      day: 'Viernes',
      startTime: this.getTime(new Date, 0),
      endTime: this.getTime(new Date, 2),
      professor: 'Yukihiro Matsumoto'
    },
    {
      id: this.idService.generateId(),
      name: 'Ruby on Rails',
      day: 'Martes',
      startTime: this.getTime(new Date, 0),
      endTime: this.getTime(new Date, 2),
      professor: 'David Heinemeier'
    },
    {
      id: this.idService.generateId(),
      name: 'Python',
      day: 'Lunes',
      startTime: this.getTime(new Date, 0),
      endTime: this.getTime(new Date, 2),
      professor: 'Guido van Rossum'
    },
  ];

  constructor(private idService: IdService) { }

  getClasses$(): Observable<CourseClass[]> {
    return of(this.classes);
  }

  createClass$(courseClass: CourseClass): Observable<CourseClass[]> {
    this.classes.push(courseClass);
    return of([...this.classes]);
  }

  editClass$(editedClass: CourseClass): Observable<CourseClass[]> {
    this.classes = this.classes.map(courseClass => courseClass.id === editedClass.id ? { ...courseClass, ...editedClass } : courseClass);
    return of([...this.classes]);
  }

  removeClass$(classId: string): Observable<CourseClass[]> {
    this.classes = this.classes.filter(courseClass => courseClass.id !== classId);
    return of([...this.classes]);
  }

  private getTime(date: Date, hours?: number): string {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const hrs = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return hrs + ':' + min;     
  }
}
