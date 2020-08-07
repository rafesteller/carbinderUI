import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Service } from '../../service'
import {CarService} from '../../car.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'doc-service',
  templateUrl: './doc-service.component.html',
  styleUrls: ['./doc-service.component.css']
})
export class DocServiceComponent {

  //the car to add service
  @Input() carid: number

  //used to refresh parent when car is added
  @Output() addedService = new EventEmitter()

  service: Service = new Service(null, null, null, null, null,this.carid);

  constructor(private carService: CarService ) {}

  onSubmit(serviceForm: NgForm) {
    this.service['car'] = this.carid
    this.service['completed'] = new Date(this.service['completed'])
    this.service['scheduled'] = new Date(this.service['scheduled'])
    this.carService.documentService(this.service).subscribe( response => 
      {
        console.log(response)
        serviceForm.reset()
        this.addedService.emit()
      }
    )
  }


}
