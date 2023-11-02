import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from './course-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  
  @Input() dataSource: Course[];

  @Output() removeCourse = new EventEmitter<string>();

  @Output() editCourse = new EventEmitter<Course>();

  constructor(private router: Router) { }

  navigateToCourse(course: Course): void {
    this.router.navigate(['courses', course.id], {
      state: course
    });
  }
}
