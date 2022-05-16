import { Injectable, Injector } from '@angular/core';
import { LocalStorageUtils } from './local-storage-utils';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(public injector: Injector,
    private route: ActivatedRoute,
    private router: Router  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localStorageUtils = this.injector.get(LocalStorageUtils);    
    let jwtToken =  localStorageUtils.getJwtToken();
    if(jwtToken == null){
      jwtToken = "dummytoken";
    }
    request = request.clone({
      headers: new HttpHeaders({
        token: jwtToken
      })
    })
    
    console.log('Intercepted HTTP call', request);
    return next.handle(request)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
          console.info('HttpResponse::event =', event, ';');
        } else console.info('event =', event, ';');
        return event;
      })).pipe(
      catchError(this.handleError<any>('addHero')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
       // log to console instead
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.info('err.error.403 =', error.error, ';');
        }
        if (error.status === 401) {
          console.info('err.error.401 =', error.error, ';');
          let localStorageUtils = this.injector.get(LocalStorageUtils);
          localStorageUtils.clearJwtToken();
          this.router.navigate(['log-in']);
        }
        return Observable.throw(error);
      }

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}