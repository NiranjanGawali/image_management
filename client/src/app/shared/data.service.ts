/**********************************************************/
/* THIS FILE CONTAIN STANDERT DECLARATION OF HTTP METHODS OF
 POST,PUT,DELETE AND GET API. */
/**********************************************************/


import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: any;
  token: any;
  baseURL: any;

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiBase;
    console.log(this.baseURL);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }



  getService(apiUrl: string): Observable<any> {
    this.url = this.baseURL + apiUrl;
    return this.http.get(this.url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postService(apiUrl: string, data: any): Observable<any> {
    this.url = this.baseURL + apiUrl;
    return this.http.post(this.url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteService(apiUrl: string): Observable<any> {
    this.url = this.baseURL + apiUrl;
    return this.http.delete(this.url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));;
  }

  putService(apiUrl: string, data: any): Observable<any> {
    this.url = this.baseURL + apiUrl;
    return this.http.put(this.url, data, httpOptions).pipe(
      catchError(this.handleError)
    );;
  }


}
