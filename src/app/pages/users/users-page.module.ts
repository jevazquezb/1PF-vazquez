import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersPageComponent } from './users-page.component';
import { UserTableComponent } from 'src/app/components/user-table/user-table.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    UsersPageRoutingModule,
    SharedModule,
  ]
})
export class UsersPageModule { }
