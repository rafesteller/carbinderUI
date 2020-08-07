import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Service } from '../../service'
import { NgForm } from '@angular/forms';
import { CarService } from '../../car.service';

@Component({
  selector: 'app-schedule-service',
  templateUrl: './schedule-service.component.html',
  styleUrls: ['./schedule-service.component.css']
})
export class ScheduleServiceComponent {

  @Input() carid: number
  @Output() scheduled= new EventEmitter();


  //the service to add
  service: Service = new Service(null, null, null, null, null,this.carid );

  constructor(private carService: CarService) {}

  onSubmit(serviceForm: NgForm) {
    this.service['car'] = this.carid
    this.service['scheduled'] = new Date(this.service['scheduled'])
    this.carService.scheduleService(this.service).subscribe( response => {
      console.log(response)
      serviceForm.reset()
      this.scheduled.emit()
    })
  }


}
