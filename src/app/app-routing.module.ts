import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'students',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/students/students-page.module').then(m => m.StudentsPageModule)
  },
  {
    path: 'courses',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/courses/courses-page.module').then(m => m.CoursesPageModule)
  },
  {
    path: 'classes',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/classes/classes-page.module').then(m => m.ClassesPageModule)
  },
  {
    path: 'enrollments',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/enrollments/enrollments.module').then(m => m.EnrollmentsModule)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/users/users-page.module').then(m => m.UsersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
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
