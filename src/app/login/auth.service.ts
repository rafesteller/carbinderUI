import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { of, timer, Observable } from 'rxjs';



export const TOKEN_NAME: string = 'jwt_token';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private static tokenRefresher = null;

    static valid = false;

    static getToken(): string {
        
        return localStorage.getItem(TOKEN_NAME);
    }

    static logOut() {
        localStorage.clear();
    }
    private static getTokenexperiationDate(token: string): Date {
        const decoded = JSON.parse(token);
        //console.log(decoded);
        if (decoded.exp == undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        //console.log(date)
        return date;
    }

    static isTokenExpired(token?: string): boolean {
        if(!token) token = AuthService.getToken();
        //console.log("in is token expired")
        if(token == "" || token == null)  {
            
            return true;
            
        }
        if (AuthService.tokenRefresher === null) {
            AuthService.startTokenTimer();
        }
        let tokDate = AuthService.getTokenexperiationDate(token);
        let currDate = new Date();
        //console.log(tokDate)
        //console.log(currDate)
        if (tokDate < currDate) {
            console.log("token expired logging out")
            AuthService.logOut();
            return true;
        }
        return false;
    }

    private static url: string = 'http://127.0.0.1:8000/api/v1/auth/';
    private url: string = 'http://127.0.0.1:8000/api/v1/auth/'
    //const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {}

    getToken(): string {
        return AuthService.getToken();
    }

    static setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
    }

    static startTokenTimer(): void {
        if (AuthService.tokenRefresher != null) {
            AuthService.tokenRefresher.unsubscribe();
        }
        console.log("starting timer")

        let httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
        //refresh token every 4:30 secconds
        let tokdt = AuthService.getTokenexperiationDate(AuthService.getToken());
        let timeToExp = tokdt.getTime() - Date.now();
        console.log("time mins left on token", timeToExp / (60 * 1000))

        this.tokenRefresher = timer(timeToExp - 30 * 1000, 4 * 60 * 1000 + 30 * 1000).subscribe(t => {
            httpClient.get(AuthService.url + "refresh").subscribe( token => {
                console.log("got new token")
                AuthService.setToken(JSON.stringify(token));
            });
        })

    }



    login(username: string, password: string) {
       

        return this.http.post(this.url + 'signin', {'name': username, 'password': password})
       

    }

}