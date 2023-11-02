import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsPageRoutingModule } from './students-page-routing.module';
import { StudentsPageComponent } from './students-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentTableComponent } from 'src/app/components/student-table/student-table.component';
import { StudentFormComponent } from 'src/app/components/student-form/student-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';


@NgModule({
  declarations: [
    StudentsPageComponent,
    StudentTableComponent,
    StudentFormComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsPageRoutingModule,
    SharedModule
  ]
})
export class StudentsPageModule { }
