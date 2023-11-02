import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../course-table/course-table.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  courseForm: FormGroup;
  title: string = `${this.course ? 'Editar' : 'Agregar'} curso`;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public course?: Course    
  ) {
    this.courseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    if (this.course) {
      this.courseForm.patchValue(course);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }    
  }
}
