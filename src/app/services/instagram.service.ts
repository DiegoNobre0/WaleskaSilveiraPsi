import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class instagramService {
CAMPOS: string = 'media_type,media_url,thumbnail_url,permalink'
LIMITE: string = '20'
TOKEN:string = 'IGQWRPS0pTWW9aTmMzWUJ4YzZAyWkJfYXJxZAEtfcHNHaGViRUdIQjhHSWU4VjZAYM3hPbkJfU3M0N0VIMndLQVRjd2x3akdfMkpmN3l2aW1QZA2V6ZAVhxMVRwbXVPdzdSZAi0wQ0gxSEo1OC1vdnZAXUUxUcE5ocjQtZAGMZD'
REST_API: string = `https://graph.instagram.com/me/media?fields=${this.CAMPOS}&access_token=${this.TOKEN}&limit=${this.LIMITE}`
// REST_API: string = 'https://graph.instagram.com/me/media?fields=media_type,media_url&access_token=IGQWRPS0pTWW9aTmMzWUJ4YzZAyWkJfYXJxZAEtfcHNHaGViRUdIQjhHSWU4VjZAYM3hPbkJfU3M0N0VIMndLQVRjd2x3akdfMkpmN3l2aW1QZA2V6ZAVhxMVRwbXVPdzdSZAi0wQ0gxSEo1OC1vdnZAXUUxUcE5ocjQtZAGMZD'
// KEY: string = '?key=AIzaSyCLoF7T9NZKd3FM5qnoO8wmYgWXGezjosg'
httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
constructor(private httpClient: HttpClient) {}

Add(data: any): Observable<any> {  
  let API_URL = `${this.REST_API}/Medicamentos`;
  return this.httpClient
    .post(API_URL, data)
    .pipe(catchError(this.handleError));
}

GetAll() {
  return this.httpClient.get(`${this.REST_API}`);
}


GetMediaDetails(mediaId: string) {
    return this.httpClient.get(`https://graph.instagram.com/${mediaId}?fields=id,media_type,media_url,permalink,shortcode&access_token=${this.TOKEN}`);
  }

Get(id: any): Observable<any> {
  
  let API_URL = `${this.REST_API}/Medicamentos/${id}`;
  return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.handleError)
  );
}

// update(data: any): Observable<any> {
//   let API_URL = `${this.REST_API}/Medicamentos/${data.id}`;
//   return this.httpClient
//     .put(API_URL, data, { headers: this.httpHeaders })
//     .pipe(catchError(this.handleError));
// }



handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  } 
  return throwError(() => {
    errorMessage;
  });
}

}
