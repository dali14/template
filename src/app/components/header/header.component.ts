import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'mg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  logout :string ="" ;

  constructor(public cartService: CartService,
    public local :LocalStorageService,
    public route:Router) {
  }
  public iduser:string;
  ngOnInit() {
  this.cartService.cartTotal$.subscribe(total => {
    this.cartTotal = total;
  });

  this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
  
  this.iduser = localStorage.getItem('username');
  if (this.iduser.length > 0){
    this.logout = "logout"

  }
  }
  logoutm(){
    localStorage.clear();
    this.ngOnInit();

  }
  


}
