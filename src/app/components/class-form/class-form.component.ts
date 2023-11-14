import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseClass } from '../class-table/class-table.model';
import { ClassesService } from 'src/app/shared/services/classes.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent {
  classForm: FormGroup;
  title: string = `${this.courseClass ? 'Editar' : 'Agregar'} clase`;
  // businessDays: {[key: string]: string}[] = ClassesService.BUSINESS_DAYS
  businessDays: string[] = ClassesService.BUSINESS_DAYS

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassFormComponent>,
    private classesService: ClassesService,
    @Inject(MAT_DIALOG_DATA) public courseClass?: CourseClass   
  ) {
    this.classForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      day: ['', Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      professor: ['', Validators.maxLength(25)]
    });

    if (this.courseClass) {
      this.classForm.patchValue(courseClass);
    }
  }

  onSubmit(): void {
    if (this.classForm.invalid) {
      return this.classForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.classForm.value);
    }    
  }

}
