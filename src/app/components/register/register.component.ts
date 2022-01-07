import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'mg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
                public formBuilder: FormBuilder,
                public authService: AuthService,
                public router: Router,
                private toastr: ToastrService
  ) { 
    this.registerForm = this.formBuilder.group({
      username:[''],
      password:[''],
      confirmedPasssword:[''],
      email:[''],
      adresse:[''],
      tel:[''],
      
    });
  }

  ngOnInit() {
  }
  signupUser(){
    this.authService.signup(this.registerForm.value).subscribe((res :any) => {
      if(res.error == 500) {
        this.toastr.error("User name Used")
        console.log(res.status)

      
      }else 
        this.registerForm.reset();
        this.router.navigate(['login']);
        this.toastr.success("register Succes","welcome");
      
    });
}

}
