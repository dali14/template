import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: 'mg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  invalidLogin = false ;
  public iduser: string ;
  
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { 
      this.loginForm= this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit() {
    this.iduser = localStorage.getItem("session").slice(1,-1);
    
    if(this.iduser === "true"){
    
    this.router.navigate(['myaccount']);

  }else{
    this.router.navigate(['login']);
  }

  }

  loginUser() {
    this.authService.login(this.loginForm.value)
    
  }

}
