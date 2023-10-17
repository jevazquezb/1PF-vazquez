import { Pipe, PipeTransform } from '@angular/core';
import { StudentsModel } from '../../components/student-table/student-table.model';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: StudentsModel, ...args: unknown[]): unknown {
    const name = value.name[0].toUpperCase()+ value.name.slice(1).toLowerCase();
    const lastName = value.lastName[0].toUpperCase()+ value.lastName.slice(1).toLowerCase();

    return `${name} ${lastName}`;
  }
}