import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students-page.module').then(m => m.StudentsPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses-page.module').then(m => m.CoursesPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./pages/classes/classes-page.module').then(m => m.ClassesPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
