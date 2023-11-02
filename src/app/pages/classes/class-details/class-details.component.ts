import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseClass } from 'src/app/components/class-table/class-table.model';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent {
  class: CourseClass;

  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.class= navigation.extras.state as CourseClass;
  }

  navigateToClassesList(): void {
    this.router.navigate(['classes']);
  }

}
