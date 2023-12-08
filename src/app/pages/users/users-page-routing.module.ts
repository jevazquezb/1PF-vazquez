import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page.component';
import { adminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    component: UsersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPageRoutingModule { }
