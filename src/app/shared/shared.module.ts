import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule}  from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule}  from '@angular/material/paginator';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeaderFontDirective } from './directives/header-font.directive';
import { FormErrorHandlerPipe } from './pipes/form-errors.pipe';


@NgModule({
  declarations: [FullNamePipe, HeaderFontDirective, FormErrorHandlerPipe],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    FullNamePipe,
    HeaderFontDirective,
    FormErrorHandlerPipe
  ]
})
export class SharedModule { }
