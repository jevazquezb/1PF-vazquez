import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/components/course-table/course-table.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
  course: Course;

  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.course = navigation.extras.state as Course;
  }

  navigateToCoursesList(): void {
    this.router.navigate(['courses']);
  }

}
