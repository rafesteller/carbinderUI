import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {ServiceDataSource} from './datasources/service.datasource'
import {CarService} from '../car.service'
import { Car } from '../car';


@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private carService: CarService) { }

  //the id for the car details
  id: number;
  car: Car;

  //the completed service columns to display in order
  serviceHistoryColumns: string[] = ['service', 'completed', 'cost', 'details'];
  scheduledColumns: string[] = ['service','scheduled', 'details', 'completed'];

  //data for the service history table
  //serviceHisotry: ServiceDataSource;
  dataSource: ServiceDataSource
  scheduledServices: ServiceDataSource
  @ViewChild(MatSort, {static: true}) sortDataSource: MatSort;

  ngOnInit() {
    //console.log(this.serviceHistory[1].name)
    this.id = +this.route.snapshot.paramMap.get('id');
    this.dataSource = new ServiceDataSource(this.carService, 'serviceHistory', this.id);
     
    this.scheduledServices = new ServiceDataSource(this.carService, 'scheduledServices', this.id);

    this.carService.getCar(this.id).subscribe( (response: Car) => {
      console.log("getcar response", response)
      this.car = response;
    })

    
    this.refresh()    

  }

  refresh() {
    this.dataSource.load();
    this.scheduledServices.load();
  }



}
