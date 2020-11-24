import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs'
import { environment } from '../../environments/environment'

import { Car } from './car'
import  { Service } from './service'


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

@Injectable({
  providedIn: 'root'
})
export class CarService {
    private url: string = environment.api_url + 'api/v1/cars/';
    private cartypeUrl: string = environment.api_url + 'api/v1/cartype/';
    private serviceUrl: string = environment.api_url + 'api/v1/service/'
    constructor(private http: HttpClient) {}


    getCars() {
       

        return this.http.get(this.url + "cars")
       

    }

    getCar(id: number) {
      return this.http.get(this.url + 'car/' + id.toString());
    }


    addCar(car: Car) {
      console.log('add car')
      console.log(car)

      return this.http.post(this.url + 'add',car, httpOptions)
    }

    removeCar(car: Car) {
      console.log('remove')
      console.log(car)
      let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: car
      };
      return this.http.delete(this.url + 'remove', options)
    }

    getBrands(year: number) {
      return this.http.get(this.cartypeUrl + 'brands/' + year.toString(), httpOptions)
    }

    getModels(brand: string, year: number) {
      return this.http.get(this.cartypeUrl + 'models/' + brand + '/' + year.toString())
    }

    documentService(service: Service) {
      return this.http.post(this.serviceUrl + 'document', service, httpOptions)
    }

    scheduleService(service: Service) {
      return this.http.post(this.serviceUrl + 'schedule', service, httpOptions)
    }

    completedService(service: Service, serviceid: number) {
      return this.http.put(this.serviceUrl + 'completed/' + serviceid.toString(), service, httpOptions)
    }

    serviceHistory(carid: number) {
      return this.http.get(this.serviceUrl + 'history/' + carid.toString(), httpOptions)
    }

    scheduledServices(carid: number) {
      return this.http.get(this.serviceUrl + 'schedule/' + carid.toString(), httpOptions)
    }


}
