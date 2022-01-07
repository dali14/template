import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { OrderPiece } from "src/app/models/orderPiece.model";
import { Order } from "src/app/models/order.model";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: ProductResponseModel[] = [];
  ServerURL = environment.serverURL;
  API_URL:string ="http://localhost:8088/"
  private orderp: OrderPiece ;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {
  }


  getSingleOrder(orderId: Number) {
    return this.http.get<ProductResponseModel[]>(`${this.ServerURL}orders/${orderId}`).toPromise();
  }

  addorderpiece(orderp: OrderPiece){
    return this.http.post<any>(`${this.API_URL}orderPieces`,orderp).subscribe((res: any) => {  })
  }
  addorder(order:Order){
    return this.http.post<any>(`${this.API_URL}orders`,order).subscribe((res1: any) => { 
      this.localStorageService.set('orderID', res1.id);
     })

  }
  getorderbyusername(userid:string){
    return this.http.get(this.API_URL + 'orderByUserId?id_user=' + userid).pipe(
      catchError(this.handleError))

  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}

interface ProductResponseModel {
  id: Number;
  title: String;
  description: String;
  price: Number;
  quantityOrdered: Number;
  image: String;
}
