import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../user'
import {environment} from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

@Injectable({
  providedIn: 'root'
})
export class UserMangService {
    private url: string = environment.api_url + 'api/v1/users/';
  
    constructor(private http: HttpClient) {}


    getUsers() {
       

        return this.http.get(this.url + 'users')
       

    }


    addUser(user: User) {

      return this.http.post(this.url + 'signup', user, httpOptions)
    }

    removeUser(user: User) {
      let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: user
      };
      return this.http.delete(this.url + 'remove', options)
    }

    editUser(user: User) {
      
      return this.http.put(this.url + "edit", user, httpOptions)
    }

}
