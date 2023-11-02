import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Course } from 'src/app/components/course-table/course-table.model';
import { IdService } from './id.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = [
    {
      id: this.idService.generateId(),
      name: 'Desarrollo web',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: this.idService.generateId(),
      name: 'Javascript',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: this.idService.generateId(),
      name: 'Angular',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: this.idService.generateId(),
      name: 'Ruby',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: this.idService.generateId(),
      name: 'Ruby on Rails',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: this.idService.generateId(),
      name: 'Python',
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  constructor(private idService: IdService) { }

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById$(id: string): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }

  createCourse$(course: Course): Observable<Course[]> {
    this.courses.push(course);
    return of([...this.courses]);
  }

  removeCourse$(courseId: string): Observable<Course[]> {
    this.courses = this.courses.filter(course => course.id !== courseId);
    return of([...this.courses]);
  }

  editCourse$(editedCourse: Course): Observable<Course[]> {
    this.courses = this.courses.map(course => course.id === editedCourse.id ? { ...course, ...editedCourse } : course);
    return of([...this.courses]);
  }
}
