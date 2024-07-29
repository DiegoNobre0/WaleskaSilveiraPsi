import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://app-wspsi-backend-v2.vercel.app';
  // private apiUrl = 'https://localhost:3333';

  constructor(private http: HttpClient) {}

  approveComment(id: string, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-comment`, { id, token });
  }

  rejectComment(id: string, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject-comment`, { id, token });
  }
}
