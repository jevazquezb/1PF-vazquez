import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsModel } from 'src/app/components/student-table/student-table.model';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  student: StudentsModel;

  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.student = navigation.extras.state as StudentsModel;
  }

  navigateToStudentsList(): void {
    this.router.navigate(['students']);
  }
}
