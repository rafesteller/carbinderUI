import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[pastdate]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PastDateDirective,
    multi: true
  }]
})

export class PastDateDirective implements Validator {
    validate(control: AbstractControl) : {[key: string]: any} | null {
       return pastDateValidator()(control);
    }
}

export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log("called check")
    console.log(control.value)
    if (control.value && new Date(control.value).getTime() <= Date.now()) {
      return null; // return object if the validation is not passed.
    }
    return {'pastdate':true}; // return null if validation is passed.
  }
}