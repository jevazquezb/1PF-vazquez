import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesPageRoutingModule } from './classes-page-routing.module';
import { ClassesPageComponent } from './classes-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassTableComponent } from 'src/app/components/class-table/class-table.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassFormComponent } from 'src/app/components/class-form/class-form.component';


@NgModule({
  declarations: [
    ClassesPageComponent,
    ClassTableComponent,
    ClassFormComponent,
    ClassDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassesPageRoutingModule,
    SharedModule
  ]
})
export class ClassesPageModule { }
