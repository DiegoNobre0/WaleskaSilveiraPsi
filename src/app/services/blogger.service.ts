import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  private apiKey = 'AIzaSyCLoF7T9NZKd3FM5qnoO8wmYgWXGezjosg'; // Chave de API do Google
  private blogId = '7973829152381710727'; // ID do seu blog no Blogger
  private baseUrl = 'https://www.googleapis.com/blogger/v3/blogs';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    const url = `${this.baseUrl}/${this.blogId}/posts?key=${this.apiKey}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getPostById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${this.blogId}/posts/${id}?key=${this.apiKey}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  postComment(postId: string, comment: string): Observable<any> {
    const url = `/api/blogger/blogs/${this.blogId}/posts/${postId}/comments?key=${this.apiKey}`;

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post(url, { content: comment }, { headers: httpHeaders }).pipe(
      catchError(this.handleError)
    );
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
