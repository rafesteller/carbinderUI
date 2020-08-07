import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { of } from 'rxjs';
import { catchError, finalize} from 'rxjs/operators';

import { CarService } from '../car.service';
import { Car } from '../car';

@Component({
  selector: 'AddCar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})


export class AddcarComponent implements OnInit {

  //used to refresh parent when car is added
  @Output() addedCar = new EventEmitter()

  public newCar: Car = new Car('', '', '', null, null, null);
  public years: number[] = []
  public brands: string[] = []
  public models: string[] = []
  public carTypes: any[] = []
  //the transmision array ends up holding the ID of the car to be added
  public transmissions: any[] = []
  public carForm: FormGroup;
  public year: FormControl;
  public brand: FormControl;
  public model: FormControl;
  public transmission: FormControl;


  constructor(private carService: CarService ) {
    let currYear: number = new Date().getFullYear()
    while (currYear > 1984) {
      this.years.push(currYear);
      currYear -= 1;
    }
  }

  ngOnInit() {
    this.year = new FormControl(null, [
      Validators.required
    ])

    this.brand = new FormControl(null, [
      Validators.required
    ])
    this.brand.disable()

    this.model = new FormControl(null, [
      Validators.required
    ])
    this.model.disable()

    this.transmission = new FormControl(null, [
      Validators.required
    ])
    this.transmission.disable()


    this.carForm = new FormGroup({
      'year': this.year,
      'brand': this.brand,
      'model': this.model,
      'transmission': this.transmission,
    })
  }


  addCar() {
    console.log("adding car")
    console.log(this.transmission.value)
    this.carService.addCar(this.transmission.value).subscribe( response => 
      {
        this.carForm.reset();
        console.log(response);
        this.addedCar.emit();
      }
    )

  }

  

  yearKey(value: string) {
    console.log(value);
    this.carService.getBrands(this.year.value).pipe(
      catchError(() => of([])),
      finalize(() => {
        this.brand.reset()
        this.brand.enable()

        this.model.reset()
        this.model.disable()

        this.transmission.reset()
        this.transmission.disable()
      })
    )
    .subscribe((brands:string[]) => this.brands = brands)
  }

  brandKey(value: string) {
    this.models = []
    this.carTypes = []
    this.carService.getModels(this.brand.value, this.year.value).pipe(
      catchError(() => of([])),
      finalize(() => {
        console.log(this.models);
        this.model.reset()
        this.model.enable()

        this.transmission.reset()
        this.transmission.disable()
      })
    )
    .subscribe((models:any[]) => {
      models.forEach(model => {
        if (!this.models.includes(model.model)) {
          this.models.push(model.model);
        }
        this.carTypes.push(model)
      })
    })


  }

  modelKey(value: string) {
    console.log(this.model.value)
    this.transmissions = []
    this.carTypes.forEach(model => {
      if (model.model == this.model.value) {
        this.transmissions.push(model)
      }
    })
    this.transmission.enable()
  }
 

}

