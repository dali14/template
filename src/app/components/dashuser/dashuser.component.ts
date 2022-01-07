import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { Router } from '@angular/router';
import { Users  } from "src/app/models/users.module";
import { LocalStorageService } from "src/app/services/local-storage.service";
import {OrderService} from "src/app/services/order.service";
import { OrderPiece } from "src/app/models/orderPiece.model";

@Component({
  selector: 'mg-dashuser',
  templateUrl: './dashuser.component.html',
  styleUrls: ['./dashuser.component.scss']
})
export class DashuserComponent implements OnInit {
  public dataSource: any =[] ;
  public dataSource2 : any= [] ;
  public updateForm: FormGroup;
  constructor(
    private user : UsersService ,
    private order :OrderService,
    public formBuilder: FormBuilder,
    private route :ActivatedRoute,
    public router: Router,
    private rout : Router,
    private local :LocalStorageService 
    ) { 
      this.updateForm = this.formBuilder.group({
        username: [''],
        email: ['', [Validators.email, Validators.required]],
        adresse:[''],
        password: ['', [Validators.minLength(6), Validators.required]],


      });
    }
  iduser:string;
  id :any ;
  ngOnInit(): void {

    


    this.iduser = localStorage.getItem('username').slice(1,-1);
    //console.log(this.iduser);


    
    if(this.iduser == null){
      
      this.rout.navigate(['login'])
    }else{
      this.user.getuserbyname(this.iduser).subscribe(
        res => this.dataSource = res );
        //this.id = this.dataSource.user_id;
        this.local.set('iduser',this.dataSource.user_id);
        console.log(this.dataSource?.user_id)
        //console.log(this.dataSource.user_id);
    }

    
      this.order.getorderbyusername(this.iduser).subscribe(
        res1 => this.dataSource2 =res1);

    

    }
    updateUser(){
        let id=1;
        this.user.put(this.id,this.updateForm.value ).subscribe(res => {
        /*this.router.navigate(['/profile/account/:id']);*/
        this.ngOnInit();
        }
      );
      
      
  
      
     
    
    
    }
    

  }


