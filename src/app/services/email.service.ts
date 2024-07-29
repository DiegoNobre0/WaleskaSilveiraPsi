import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) {}

 
  postEmail(data: any): Observable<any> {       
    const url = "https://app-wspsi-backend-v2.vercel.app/send-form";
    // const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
    .post(url, data)
    .pipe(catchError(this.handleError));
  } 

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
