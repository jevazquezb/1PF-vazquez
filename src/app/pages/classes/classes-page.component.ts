import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ClassFormComponent } from 'src/app/components/class-form/class-form.component';
import { CourseClass } from 'src/app/components/class-table/class-table.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-classes',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.scss']
})
export class ClassesPageComponent {
  classes$: Observable<CourseClass[]>;
  userRole$: Observable<'ADMIN' | 'USER' | undefined>;

  constructor (
    private classesService: ClassesService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.classes$ = classesService.getClasses$();

    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map(user => user?.role));
  }

  addClass(): void {
    this.matDialog
      .open(ClassFormComponent)
      .afterClosed()
      .subscribe({
        next: (courseClass) => {
          if (courseClass) {
            this.classes$ = this.classesService.createClass$(courseClass);
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

  onRemoveClass(classId: number): void {
    if (confirm(`¿Desea eliminar la clase con clave ${classId}?`)) {
      this.classes$ = this.classesService.removeClass$(classId);
    }
  }
}
