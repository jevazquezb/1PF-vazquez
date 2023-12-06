import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentsEffects } from '../../store/enrollments/enrollments.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentsFeature } from 'src/app/store/enrollments/enrollments.reducer';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsTableComponent } from 'src/app/components/enrollments-table/enrollments-table.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentsTableComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([EnrollmentsEffects]),
    SharedModule
  ]
})
export class EnrollmentsModule { }
