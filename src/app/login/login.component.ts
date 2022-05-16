import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { LocalStorageUtils } from '../utils/local-storage-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private localStorageUtils : LocalStorageUtils) { }

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  signUp() {
    this.loginService.signUp(this.signUpForm.value)
      .subscribe(data => {
        console.log(data);
        alert(data);
        this.localStorageUtils.setJwtToken((data.result));
      });
  }

  login() {
    this.loginService.login(this.loginForm.value)
      .subscribe(data => {
        console.log(data);
        alert(data);
        this.localStorageUtils.setJwtToken((data.result));
      });
  }

  signOut(){
    this.localStorageUtils.clearJwtToken();
  }

}
