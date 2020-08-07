import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'


import { CarService } from '../car.service';
import { CarListDataSource } from './car-list.datasource'
import { Car } from '../car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})


export class CarListComponent implements OnInit {

  public displayedColumns: string[] = ['brand', 'model', 'year', 'service', 'remove'];
  public dataSource: CarListDataSource;
  public showAdd: Boolean = false;


  constructor(private carService: CarService, private router: Router ) {
  }

  ngOnInit() {
    this.dataSource = new CarListDataSource(this.carService);
    this.dataSource.loadCars();
  }



  removeCar(car: Car) {
    console.log("remove car")
    console.log(car)
    this.carService.removeCar(car).subscribe( response => {
      console.log(response)
      this.dataSource.loadCars();
    })
  }

  refresh() {
    this.dataSource.loadCars();
    this.showAdd = false
  }

  serviceCar(car: Car) {
    console.log("service car")
    console.log(car)
    this.router.navigateByUrl('/car-details/' + car.id);
    //TODO: go to service page
  }
 

}
