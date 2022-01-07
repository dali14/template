import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, serverResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAllProducts(limitOfResults=10): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'pieces', {
      
      params: {
        limit: limitOfResults.toString()
      }
      
    });
    
  }

  all(){
    return this.http.get(this.url+ 'pieces');
  }

  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'pieces/' + id);
  }

  getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url + 'products/category/' + catName);
  }

}
