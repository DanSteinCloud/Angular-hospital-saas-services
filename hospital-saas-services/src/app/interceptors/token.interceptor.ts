import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private httpClient: HttpClient,private authenticationService: AuthenticationService,private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handled: boolean = false;
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser ;
    if (isLoggedIn)
    {

      if (localStorage.getItem('token')!=null){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
              X_HI_CODE :localStorage.getItem('X_HI_CODE')
          }
        });
      }
      else
      {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
              X_HI_CODE :localStorage.getItem('X_HI_CODE'),

          }
        });
      }


    }
    else
    {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
            X_HI_CODE :localStorage.getItem('X_HI_CODE')
        }
      });
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((returnedError) => {

        if ([401, 403].indexOf(returnedError.status) !== -1) {
          this.removeAllLocalStorage();
          this.authenticationService.logout();
          this.router.navigate([ '../../' ]);
          location.reload();
        }
        const error = returnedError.error.message || returnedError.statusText;
        return throwError(error);

        // let errorMessage = null;

        // if (returnedError.error instanceof ErrorEvent) {
        //   errorMessage = `Error: ${returnedError.error.message}`;
        // } else if (returnedError instanceof HttpErrorResponse) {
        //   errorMessage = `Error Status ${returnedError.status}: ${returnedError.error.error} - ${returnedError.error.message}`;
        //   handled = this.handleServerSideError(returnedError);
        // }

        // if (!handled) {
        //   if (errorMessage) {
        //     return throwError(errorMessage);
        //   } else {
        //     return throwError("Unexpected problem occurred");
        //   }
        // } else {
        //   return of(returnedError);
        // }
      })
    );
  }
  private removeAllLocalStorage() {
    return Object.keys(localStorage)
        .reduce((obj, k) => {
              return { ...obj, [k]: localStorage.removeItem(k)}}, {});
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      case 401:
        this.authenticationService.logout();
        handled = true;
        break;
      case 403:
        this.authenticationService.logout();
        handled = true;
        break;
    }

    return handled;
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //     const currentUser = this.authenticationService.currentUserValue;
  //     const isLoggedIn = currentUser ;
  //     if (isLoggedIn)
  //     {

  //       request = request.clone({
  //         setHeaders: {
  //           'Content-Type': 'application/json',
  //             Authorization: localStorage.getItem('token'),
  //             X_HI_CODE :localStorage.getItem('X_HI_CODE')
  //         }
  //       });

  //     }



  //     return next.handle(request).pipe(catchError(err => {
  //       if ([401, 403].indexOf(err.status) !== -1) {
  //           // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  //           this.authenticationService.logout();
  //           this.router.navigate(['/login']);
  //          // location.reload(true);
  //       }

  //       const error = err.error.message || err.statusText;
  //       return throwError(error);
  //   }));


  //}

  getToken() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('X_HI_CODE', '001');
    return this.httpClient.post('http://localhost:8484/nid-api/v1/users/login', {
      username: 'user1',
      password: 'coolbeans10!'
    }, { headers });
  }
}
