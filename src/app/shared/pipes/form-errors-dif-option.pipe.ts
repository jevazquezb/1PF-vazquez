import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formErrorHandler',
})
export class FormErrorHandlerPipe implements PipeTransform {
  transform(
    value: ValidationErrors | null | undefined,
    ...args: unknown[]
  ): string {
    const option = args[0] as Option;

    if (!value) return '';

    const errorMessages: string[] = [];

    if ('required' in value) {
      errorMessages.push('Este campo es obligatorio');
    }

    if ('min' in value) {
      if (option === 'age') {
        errorMessages.push(`La edad mínima debe ser de ${value['min'].min} años`);
      } else {
        errorMessages.push(`La calificación mínima debe ser de ${value['min'].min}`);
      }      
    }

    if ('max' in value) {
      if (option === 'age') {
        errorMessages.push(`La edad máxima debe ser de ${value['max'].max} años`);
      } else {
        errorMessages.push(`La calificación máxima debe ser de ${value['max'].max}`);
      }  
    }

    return errorMessages.join('. ');
  }
}

type Option = 'age' | 'grade';