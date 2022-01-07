import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient,HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError,map  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Users } from '../models/users.module';
import { LocalStorageService } from "src/app/services/local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL:string ="http://localhost:8088";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public isLoggedIn:boolean = false;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    public router: Router
  ) { }

  signup(user: Users): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/registre`, user).pipe(
      catchError(this.handleError)
  )
        
  }

  login(user: Users){
    return this.httpClient.post<any>(`${this.API_URL}/login`, user)
      .subscribe((res: any) => {
        this.localStorageService.set('username', user.username);
        this.localStorageService.set('session', 'true');
        
        
        console.log('hi');
        this.router.navigate(['myaccount']);
        //this.isLoggedIn = true;
        //this.localStorageService.set('access_token', res.token);
        //this.localStorageService.set('userid', res.userId);
        //this.router.navigate(['myaccount']);
        // this.getUserProfile(res.userId).subscribe((res) => {
        //   this.localStorageService.set('user', {email: res.email, id: res._id, name: res.name});
        // })
      })
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
