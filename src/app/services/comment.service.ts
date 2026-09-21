import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // Use a URL do seu backend na Vercel (com HTTPS)
  private apiUrl = 'https://app-wspsi-backend-v2.vercel.app'; 
  // private apiUrl = 'http://localhost:3333'; // Use apenas se estiver testando local

  constructor(private http: HttpClient) {}

  approveComment(id: string, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/approve`, { id, token });
  }

  rejectComment(id: string, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/reject`, { id, token });
  }
}