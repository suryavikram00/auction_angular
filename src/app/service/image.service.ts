import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  addImageUrl = "http://localhost:8080/add-image-compressed";

  constructor(private http: HttpClient) { }

  addImage(image : File[], productId : any): Observable<any>{
    console.log('productId :: '+productId);
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
    const formData = new FormData();
    for(var i = 0; i < image.length ; i++){
      formData.append('file', image[i]);
    }
    
    formData.append('productId', productId);
    return this.http.post<any>(this.addImageUrl, formData, httpOptions).pipe(
      catchError(this.handleError<any>('addHero'))
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
