import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseClass } from './class-table.model';

@Component({
  selector: 'class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss']
})
export class ClassTableComponent {
  displayedColumns: string[] = ['id', 'name', 'day', 'schedule', 'actions'];

  @Input() dataSource: CourseClass[];

  @Output() removeClass = new EventEmitter<string>();

  @Output() editClass = new EventEmitter<CourseClass>();

  constructor(private router: Router) { }

  navigateToClass(courseClass: CourseClass): void {
    this.router.navigate(['classes', courseClass.id], {
      state: courseClass
    });
  }

}
