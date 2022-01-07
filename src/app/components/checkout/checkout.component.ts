import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, NgForm, Validators,FormGroup} from "@angular/forms";
import { OrderPiece } from "src/app/models/orderPiece.model";
import {  Order } from "src/app/models/order.model";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: 'mg-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  registerForm: FormGroup;
  cartData: CartModelServer;
  cartTotal: Number;
  showSpinner: Boolean;
  checkoutForm: any;
  total : Number;
  orderdes : string ;
  data : any ;
  i : number ;
  orderp: OrderPiece ={
    id: 0,
    id_order: 0,
    id_piece: 0,
    quantity: 0
  }
  order:Order={
    id: 0,
    id_user: '',
    message: '',
    success: false
  }
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private localStorageService: LocalStorageService,
              public formBuilder: FormBuilder,
              private  spinner: NgxSpinnerService,
              
               ) {

    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: [''],
      city: [''],
      country: [''],
      zipcode: [''],


    });


  }

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.total = this.cartData.total ;
    console.log(this.total);
    this.orderdes = JSON.stringify(this.cartData.data[0])
    this.data = this.cartData.data;

  }

  onCheckout() {
      //this.spinner.show().then(p => {
      this.cartService.CheckoutFromCart(1);
      
    
    this.order.message = JSON.stringify(this.registerForm.value);
    if(this.localStorageService.get('session')){
      this.order.id_user = this.localStorageService.get('username')
    }else{
      this.order.id_user = this.registerForm.value['email'];
    }
    
    this.order.success = true;
    this.orderService.addorder(this.order); 
    this.i  = this.cartData.data.length ;
    console.log(this.localStorageService.get('orderID'));
    console.log(this.i);

    for(let p = 0; p < this.i ;p++) {

       
      this.orderp.id_order = this.localStorageService.get('orderID');
      this.orderp.id_piece = Number(this.cartData.data[p].product?.id);
      this.orderp.quantity = Number(this.cartData.data[p].numInCart);
      console.log(this.orderp);
      this.orderService.addorderpiece(this.orderp); 
      
    }
    this.router.navigate(['thankyou']);


    /*}*//*);*/


  

  }
}
