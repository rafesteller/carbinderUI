import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router'
import {AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'car-binder';
  loggedIn = false;

  
  public logOut() {
    console.log("logout app")
    AuthService.logOut();
    this.router.navigate( ['login']);
    this.loggedIn = false;
    
  }


  constructor(private router: Router) {}

  ngOnInit() {
    this.loggedIn = AuthService.isTokenExpired() == false;
    //console.log(this.loggedIn)
    this.router.events.subscribe( val => {
      //console.log("in router event")
      this.loggedIn = AuthService.isTokenExpired() == false;
    })
  }

}




