import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Service } from '../../service'
import {CarService} from '../../car.service'

@Component({
  selector: 'app-complete-service',
  templateUrl: './complete-service.component.html',
  styleUrls: ['./complete-service.component.css']
})
export class CompleteServiceComponent {

  @Input() service: Service;
  
  //used to refresh parent when car is added
  @Output() completed = new EventEmitter()
  constructor(private carService: CarService) { }


  onSubmit(serviceForm: NgForm) {
    this.service['completed'] = new Date(this.service['completed'])
    console.log(this.service)
    this.carService.completedService(this.service, this.service['id']).subscribe(
      response => {
        console.log("in response")
        serviceForm.reset()
        this.completed.emit();
      }
    )
  }

}
