import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { catchError,map  } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = "http://localhost:8088/";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }



  getuserbyname(username:string) {
    console.log(username);
    return this.http.get(this.apiUrl + 'UserByUsername/?username=' + username).pipe(
      catchError(this.handleError))
  }
  put(id: string = "1", user: any){
    return this.http.put(this.apiUrl + 'user/' + id, user)
    
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
