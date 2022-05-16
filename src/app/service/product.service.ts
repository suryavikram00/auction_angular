import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  addProductUrl = "http://localhost:8080/add-update-product";
  retrieveAllProductUrl = "http://localhost:8080/retrieve-product/user/13";
  addProductBidUrl = "http://localhost:8080/add-productbid";
  retrieveProductUrl = "http://localhost:8080/retrieve-product";
  retrieveProductByUser = "http://localhost:8080/retrieve-product/user/13";
  retrieveProductBidByUser = "http://localhost:8080/retrieve-productbid/user/10";
  retrieveWonProductBidByUser = "http://localhost:8080/retrieve-won-productbid/user/10";


  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.addProductUrl, product, httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
    );
  }

  retrieveMyProduct(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.retrieveProductByUser , httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
    );
  }

  retrieveMyProductBid(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.retrieveWonProductBidByUser , httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
    );
  }

  retrieveWonProductBid(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.retrieveProductBidByUser , httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
    );
  }

  retrieveAllProduct(page: number, quantity : number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.retrieveAllProductUrl + '/page/' + page + '/quantity/' + quantity, httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
    );
  }

  retrieveProduct(productId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.retrieveProductUrl + '/' + productId, httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
    );
  }

  addProductBid(productId, bidAmount : number): Observable<any> {
    var product = {};
    product["id"] = productId;

    var user = {};
    user["userId"] = 10;

    var jsonObject = {};
    jsonObject["amount"] = bidAmount;
    jsonObject["product"] = product;
    jsonObject["user"] = user;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.addProductBidUrl, jsonObject, httpOptions).pipe(
      catchError(this.handleError<any>('productBid'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
