import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClassFormComponent } from 'src/app/components/class-form/class-form.component';
import { CourseClass } from 'src/app/components/class-table/class-table.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { IdService } from 'src/app/shared/services/id.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.scss']
})
export class ClassesPageComponent {
  classes$: Observable<CourseClass[]>;

  constructor (
    private classesService: ClassesService,
    private matDialog: MatDialog,
    private idService: IdService
  ) {
    this.classes$ = classesService.getClasses$();
  }

  addClass(): void {
    this.matDialog
      .open(ClassFormComponent)
      .afterClosed()
      .subscribe({
        next: (courseClass) => {
          if (courseClass) {
            this.classes$ = this.classesService.createClass$({
              id: this.idService.generateId(),
              name: courseClass.name,
              day: courseClass.day,
              startTime: courseClass.startTime,
              endTime: courseClass.endTime
            });
          }
        },
      });
  }

  onEditClass(selectedClass: CourseClass): void {
    this.matDialog
      .open(ClassFormComponent, {
        data: selectedClass
      })
      .afterClosed()
      .subscribe({
        next: (editedClass) => {
          if (!!editedClass) {
            editedClass.id = selectedClass.id;
            this.classes$ = this.classesService.editClass$(editedClass);
          }
        }
      });
  }

  onRemoveClass(classId: string): void {
    this.classes$ = this.classesService.removeClass$(classId);
  }
}
