import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserLogin } from '../models/user-login';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  //apiUrl: string = "http://localhost/ESP-Backend/";
  apiUrl: string = "https://hannovorster.co.za/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  postUserLoginDetails(user: UserLogin) {
    return this.http.post<UserLogin>(this.apiUrl + 'postlogin.php', user, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getWeatherData() {
    return this.http.get<Weather>(this.apiUrl + 'getweather.php')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error:any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
