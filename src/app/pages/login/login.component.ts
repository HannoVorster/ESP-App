import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/user-login';
import { RestApiService } from 'src/app/services/rest-api.service';
//import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails: UserLogin = { username: '',  password: ''};
  userName: string = "";
  password: string = "";

  constructor(private restApi: RestApiService) { }

  ngOnInit(): void {
  }

  loginUser() {
    console.log('Login button clicked');
    console.log(this.userName);
    console.log(this.password);

    this.userDetails.username = this.userName;
    this.userDetails.password = this.password;

    this.restApi.postUserLoginDetails(this.userDetails).subscribe((data: {}) => {
      console.log(data);
    })
  }

}
