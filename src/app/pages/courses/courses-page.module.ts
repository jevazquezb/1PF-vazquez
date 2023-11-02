import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageRoutingModule } from './courses-page-routing.module';
import { CoursesPageComponent } from './courses-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseTableComponent } from 'src/app/components/course-table/course-table.component';
import { CourseFormComponent } from 'src/app/components/course-form/course-form.component';
import { CourseDetailsComponent } from './course-details/course-details.component';


@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseTableComponent,
    CourseFormComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CoursesPageRoutingModule,
    SharedModule,
    
  ]
})
export class CoursesPageModule { }
