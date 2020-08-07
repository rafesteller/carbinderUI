import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';


@Directive({
  selector: '[futuredate]',
  providers: [{provide: NG_VALIDATORS,
    useExisting: FutureDateValidatorDirective,
    multi: true
  }]
})
export class FutureDateValidatorDirective implements Validator {


  validate(control: AbstractControl) : {[key: string]: any} | null {
    return futureDateValidator()(control);
 }
}



export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value && new Date(control.value).getTime() > Date.now()) {
      console.log("tests")
      return null; // return object if the validation is not passed.
    }
    return {'futureDateInvalid':true}; // return null if validation is passed.
  }
}