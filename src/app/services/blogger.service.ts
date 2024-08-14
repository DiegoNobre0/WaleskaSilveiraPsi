import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  private apiKey = 'AIzaSyAbXrTHB46qVX2NV-Rt---wlQKMEZuuV0A'; // Chave de API do Google
  private blogId = '3069278887571364282'; // ID do seu blog no Blogger
  private baseUrl = 'https://www.googleapis.com/blogger/v3/blogs';
  private URL_LOCAL = 'http://localhost:3333'

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<any> {
    const url = `${this.baseUrl}/${this.blogId}/posts?key=${this.apiKey}`;
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getPostById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${this.blogId}/posts/${id}?key=${this.apiKey}`;
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getCommentsById(id: string): Observable<any> {
    const url = `https://app-wspsi-backend-v2.vercel.app/comments?id_post=${id}`;
    // const url = `${this.URL_LOCAL}/comments?id_post=${id}`;
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getCommentsRepost(): Observable<any> {    
    const url = "https://app-wspsi-backend-v2.vercel.app/commentsRepost";
    // const url = `${this.URL_LOCAL}/commentsRepost`;
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  postComment(data: any): Observable<any> {       
    const url = "https://app-wspsi-backend-v2.vercel.app/comment";
    // const url = `${this.URL_LOCAL}/comment`;
    // const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
    .post(url, data)
    .pipe(catchError(this.handleError));
  }

  postCommentRepost(data: any): Observable<any> {    
    const url = "https://app-wspsi-backend-v2.vercel.app/commentRepost";
    // const url = `${this.URL_LOCAL}/commentRepost`;

    // const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
    .post(url, data)
    .pipe(catchError(this.handleError));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
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
