import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  invalidCredentialMsg: string;
  retUrl:string="";

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
      this.activatedRoute.queryParamMap
              .subscribe(params => {
          this.retUrl = params.get('retUrl'); 
          console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
      });
    this.user = new User('', '','', '', null);
  }

  /**
   * login
   */
  public login() {
    console.log("login")
    console.log(this.user)
    this.authService.login(this.user.name, this.user.password).subscribe(token => {
      console.log( 'return to '+ this.retUrl);
      console.log(token)
      AuthService.setToken(JSON.stringify(token));
      AuthService.startTokenTimer();
      if (this.retUrl!=null) {
           this.router.navigate( [this.retUrl]);
      } else {
           this.router.navigate( ['dashboard']);
      }
  });
  }


}
