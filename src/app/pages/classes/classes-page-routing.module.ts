import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesPageComponent } from './classes-page.component';
import { ClassDetailsComponent } from './class-details/class-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesPageComponent
  },
  {
    path: ':id',
    component: ClassDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesPageRoutingModule { }
