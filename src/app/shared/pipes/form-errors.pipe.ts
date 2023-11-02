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
    if (!value) return '';

    const option = args[0] as Option;
    const validatorError = Object.keys(value)[0];

    if (this.errorResolver[validatorError]) {
      return this.errorResolver[validatorError](value[validatorError], option);  
    }

    return '';
  }

  private errorResolver = {
    required: () => 'Este campo es obligatorio.',
    min: (error, option: Option) => option === 'age' ?
      `La edad mínima debe ser de ${error.min} años.`
      :
      `La calificación mínima debe ser de ${error.min}.`,
    max: (error, option: Option) => option === 'age' ?
      `La edad máxima debe ser de ${error.max} años.`
      :
      `La calificación máxima debe ser de ${error.max}.`,
    maxlength: (error) => `No sobrepasar los ${error.requiredLength} caracteres.`
  }
}

type Option = 'age' | 'grade';
