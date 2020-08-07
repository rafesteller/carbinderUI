import { Directive } from '@angular/core';
import {FormControl, NG_VALIDATORS } from '@angular/forms';



@Directive({
  selector: '[emailDomain][ngModel]', 
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: emailDomainValidator, 
      multi: true
    }
  ]
})

export class EmialDirective {

  constructor() { }

}


function emailDomainValidator(control: FormControl) { (1)
  let email = control.value; (2)
  if (email && email.indexOf("@") != -1) { (3)
    let [_, domain] = email.split("@"); (4)
    if (domain !== "codecraft.tv") { (5)
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null; (6)
}