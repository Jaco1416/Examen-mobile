import {Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators extends Validators {

  static claveIgual(clave_uno: string, clave_dos: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const uno = group.get(clave_uno);
      const dos = group.get(clave_dos);
      return uno?.value === dos?.value ? null : { claveIgual: true };
    };
  } 
}